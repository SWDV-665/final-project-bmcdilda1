export class Inventory {
  _id: string;
  assetName: string;
  assetQuantity: number;
  serialNumber: string;
  purchaseDate: string;
  location: string;
  assetTag: string;
  picture: string;
  file: string;
  image?: string;  // New property for camera functionality

  constructor(
    _id: string,
    assetName: string,
    assetQuantity: number,
    serialNumber: string,
    purchaseDate: string,
    location: string,
    assetTag: string,
    picture: string,
    file: string,
    image?: string  // New parameter for camera functionality
  ) {
    this._id = _id;
    this.assetName = assetName;
    this.assetQuantity = assetQuantity;
    this.serialNumber = serialNumber;
    this.purchaseDate = purchaseDate;
    this.location = location;
    this.assetTag = assetTag;
    this.picture = picture;
    this.file = file;
    this.image = image;  // Assign the new image property
  }

  getAssetName(): string {
    return this.assetName;
  }

  getAssetQuantity(): number {
    return this.assetQuantity;
  }

  getSerialNumber(): string {
    return this.serialNumber;
  }

  getPurchaseDate(): string {
    return this.purchaseDate;
  }

  getLocation(): string {
    return this.location;
  }

  getAssetTag(): string {
    return this.assetTag;
  }

  getPicture(): string {
    return this.picture;
  }

  getFile(): string {
    return this.file;
  }

  getImage(): string | undefined {  // New getter for image
    return this.image;
  }

  setAssetName(name: string) {
    this.assetName = name;
  }

  setAssetQuantity(quantity: number) {
    this.assetQuantity = quantity;
  }

  setSerialNumber(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  setPurchaseDate(purchaseDate: string) {
    this.purchaseDate = purchaseDate;
  }

  setLocation(location: string) {
    this.location = location;
  }

  setAssetTag(assetTag: string) {
    this.assetTag = assetTag;
  }

  setPicture(picture: string) {
    this.picture = picture;
  }

  setFile(file: string) {
    this.file = file;
  }

  setImage(image: string) {  // New setter for image
    this.image = image;
  }
}