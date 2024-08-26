const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');  // Added for file system operations


// Middleware setup
app.use(morgan('combined'));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));  // Increased limit to handle base64 images
app.use(cors());

app.use('/uploads', express.static('uploads'));

const port = 8081;
const mongoPort = 27017;
const url = 'mongodb://127.0.0.1:27017/inventoryDB';

let db;
let inventoryCollection;
let usersCollection;

// Connect to MongoDB
MongoClient.connect(url)
    .then(client => {
        console.log(`Connected successfully to MongoDB server on port ${mongoPort}`);
        db = client.db('inventoryDB');
        inventoryCollection = db.collection('homeinv');
        usersCollection = db.collection('users');
        
        // Start the server only after successfully connecting to the database
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB server:', err);
    });

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Destination:', 'uploads/');
        cb(null, 'uploads/');  // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        const generatedFileName = Date.now() + path.extname(file.originalname);
        console.log('Generated file name:', generatedFileName);  // Log the filename
        cb(null, generatedFileName);  // Generates a unique filename with original extension
    }
});

const upload = multer({ storage: storage });

// Function to save base64 image
// Updated 2024-08-25: Added error checking and logging
function saveBase64Image(base64Data) {
    if (!base64Data) {
        console.error('No base64 data provided');
        return { error: 'No image data provided' };
    }

    console.log('Received base64 data of length:', base64Data.length);

  // Assume the data is already in base64 format without the prefix
    const fileName = `${Date.now()}.jpg`;  // Assuming it's always a JPEG
    const filePath = path.join(__dirname, 'uploads', fileName);

    try {
        fs.writeFileSync(filePath, base64Data, {encoding: 'base64'});
        console.log(`Successfully saved image: ${fileName}`);
        return { fileName };
    } catch (error) {
        console.error('Error writing file:', error);
        return { error: 'Failed to save image file' };
    }
}


// API to create an item in the database with file upload
// Updated 2024-08-25: Improved error handling and logging
app.post('/api/Inventory', upload.single('file'), (req, res) => {
    console.log('Received POST request to /api/Inventory');
    console.log('Request body keys:', Object.keys(req.body));

    const {
        assetName,
        assetQuantity,
        serialNumber,
        purchaseDate,
        location,
        assetTag,
        picture,
        image  // New field for base64 image data
    } = req.body;

    console.log('Image data received:', image ? `${image.substring(0, 50)}...` : 'No image data');

    let fileName = null;

    if (req.file) {
        console.log('File uploaded:', req.file.filename);
        fileName = req.file.filename;
    } else if (image) {
        console.log('Processing base64 image data');
        const result = saveBase64Image(image);
        if (result.error) {
            console.error('Error saving image:', result.error);
            return res.status(400).json({ message: result.error });
        }
        fileName = result.fileName;
    }

    const newItem = {
        assetName,
        assetQuantity,
        serialNumber,
        purchaseDate,
        location,
        assetTag,
        picture,
        file: fileName,
        lastModified: new Date()
    };

    console.log('Inserting new item:', JSON.stringify(newItem, null, 2));

    inventoryCollection.insertOne(newItem)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`);
            res.status(200).json({ message: `Successfully inserted item with _id: ${result.insertedId}` });
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`);
            res.status(500).json({ message: 'Failed to insert item' });
        });
});
// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    try {
        if (!usersCollection) {
            console.error('Users collection not initialized');
            throw new Error('Users collection not initialized');
        }

        console.log('Searching for user in database...');
        const user = await usersCollection.findOne({ username, password });

        if (!user) {
            console.log('User not found or password incorrect');
            return res.status(401).json({ message: 'Authentication failed' });
        }

        console.log('User found, generating token...');
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'your_jwt_secret',  // Replace with a secure secret key
            { expiresIn: '1h' }
        );

        console.log('Login successful for user:', username);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API to get all inventory items or the latest item based on a query parameter
app.get('/api/Inventory', (req, res) => {
    const limit = parseInt(req.query.limit) || 0;

    inventoryCollection.find({}).sort({ lastModified: -1 }).limit(limit).toArray()
        .then(docs => {
            res.json(docs);
            if (limit === 1) {
                console.log("Returning the latest item");
            } else {
                console.log("Returning all items");
            }
        })
        .catch(err => {
            console.error('Error getting documents from collection:', err);
            res.status(500).json({ message: 'Error getting documents from collection' });
        });
});

// API to update an item in the database
// Updated 2024-08-25: Handle both file upload and base64 image data
app.put('/api/Inventory/:id', upload.single('file'), (req, res) => {
    console.log('PUT request received for ID:', req.params.id);
    console.log('Parsed update data:', req.body);

    const ObjectId = require('mongodb').ObjectId;
    const itemid = new ObjectId(req.params.id);

    let fileName = req.body.file;

    if (req.file) {
        fileName = req.file.filename;
    } else if (req.body.image) {
        try {
            fileName = saveBase64Image(req.body.image);
        } catch (error) {
            console.error('Error saving base64 image:', error);
            return res.status(400).json({ message: 'Invalid image data' });
        }
    }

    const updates = {
        assetName: req.body.assetName,
        assetQuantity: parseInt(req.body.assetQuantity, 10),
        serialNumber: req.body.serialNumber,
        purchaseDate: req.body.purchaseDate,
        location: req.body.location,
        assetTag: req.body.assetTag,
        picture: req.body.picture,
        file: fileName
    };

    inventoryCollection.updateOne({ _id: itemid }, { $set: updates })
        .then(result => {
            console.log('Update operation result:', result);
            if (result.matchedCount > 0 && result.modifiedCount > 0) {
                console.log(`Successfully updated item with id: ${req.params.id}`);
                res.status(200).json({ message: `Successfully updated item with id: ${req.params.id}` });
            } else if (result.matchedCount > 0 && result.modifiedCount === 0) {
                console.log(`Item with id: ${req.params.id} was found, but no changes were made.`);
                res.status(200).json({ message: `No changes were made to item with id: ${req.params.id}` });
            } else {
                console.log(`No items matched with id: ${req.params.id}`);
                res.status(404).json({ message: `No items matched with id: ${req.params.id}` });
            }
        })
        .catch(err => {
            console.error(`Failed to update item: ${err}`);
            res.status(500).json({ message: 'Failed to update item' });
        });
});






// API to delete an item from the database by id
app.delete('/api/Inventory/:id', (req, res) => {
    const assetId = req.params.id;
    const ObjectId = require('mongodb').ObjectId;
    const itemid = new ObjectId(assetId);

    inventoryCollection.deleteOne({ _id: itemid })
        .then(result => {
            if (result.deletedCount > 0) {
                console.log(`Successfully deleted item with id: ${assetId}`);
                res.status(200).json({ message: `Successfully deleted item with id: ${assetId}` });
            } else {
                console.log(`No items matched with id: ${assetId}`);
                res.status(404).json({ message: `No items matched with id: ${assetId}` });
            }
        })
        .catch(err => {
            console.error(`Failed to delete item: ${err}`);
            res.status(500).json({ message: 'Failed to delete item' });
        });
});

// API to get server connection info
app.get('/api/connection-info', (req, res) => {
    if (db) {
        res.json({
            status: 'Connected',
            details: `Connected to MongoDB on port ${mongoPort}, Database: inventoryDB`
        });
    } else {
        res.json({
            status: 'Disconnected',
            details: 'Not connected to MongoDB'
        });
    }
});

//  Retrieving a specific file by name
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    res.sendFile(filepath, err => {
        if (err) {
            console.error('File not found:', filepath);
            res.status(404).send('File not found');
        }
    });
});