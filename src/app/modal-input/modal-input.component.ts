import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonInput, IonButton, IonButtons, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventoryservice.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonSelect, IonSelectOption
  ],
})
export class ModalInputComponent implements OnInit {
  _message: string = "Add Item";
  _name?: string;
  _quantity?: number;
  _serialNumber?: string;
  _purchaseDate?: string;
  _location?: string;
  _assetTag?: string;
  _picture?: string;
  _file?: string;
  _inventory?: Inventory;
  _index?: number;
  _editMode: boolean = false;

  _quantities: number[] = [];
  _quantitySize: number = 10;

  selectedFile: File | null = null;
  capturedImage: string | undefined;

  constructor(
    private modalCtrl: ModalController,
    private inventoryService: InventoryService
  ) {
    for (let i = 1; i <= this._quantitySize; i++) {
      this._quantities.push(i);
    }
  }

  ngOnInit() {
    if (this._inventory) {
      this._name = this._inventory.assetName;
      this._quantity = this._inventory.assetQuantity;
      this._serialNumber = this._inventory.serialNumber;
      this._purchaseDate = this._inventory.purchaseDate;
      this._location = this._inventory.location;
      this._assetTag = this._inventory.assetTag;
      this._picture = this._inventory.picture;
      this._file = this._inventory.file;
      this._editMode = true;
      this._message = "Edit Item";
    }
  }



  confirm() {
    const formData = new FormData();
    formData.append('assetName', this._name || '');
    formData.append('assetQuantity', this._quantity?.toString() || '');
    formData.append('purchaseDate', this._purchaseDate || '');
    formData.append('location', this._location || '');
    formData.append('assetTag', this._assetTag || '');
    formData.append('picture', this._picture || '');
  
    if (this.selectedFile && !this._editMode) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Added captured image to formData - 2024-08-25
    if (this.capturedImage) {
      formData.append('image', this.capturedImage);
    }
  
    if (this._editMode && this._inventory) {
      this.inventoryService.editInventory(this._inventory._id, formData).subscribe(
        () => {
          this.modalCtrl.dismiss('confirm');
        },
        (error) => {
          console.error('Error editing inventory:', error);
          alert('Failed to edit inventory. Please try again.');
        }
      );
    } else {
      this.inventoryService.addInventory(formData).subscribe(
        () => {
          this.modalCtrl.dismiss('confirm');
        },
        (error) => {
          console.error('Error adding inventory:', error);
          alert('Failed to add inventory. Please try again.');
        }
      );
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = file;
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (image.base64String) {
        this.capturedImage = image.base64String;
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      alert('Failed to take picture. Please try again.');
    }
  }


  cancel() {
    this.modalCtrl.dismiss();
  }
}