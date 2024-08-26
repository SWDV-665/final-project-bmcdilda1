import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonItemSliding,
  IonLabel, IonItemOptions, IonItemOption, IonButton, IonToast, IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventoryservice.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ModalInputComponent } from '../modal-input/modal-input.component';
import { addIcons } from 'ionicons';
import { pencil, trash, camera, add } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { AlertController } from '@ionic/angular';
import { CustomFabComponent } from '../components/custom-fab/custom-fab.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonItem,
    IonItemSliding, IonLabel, IonItemOptions, IonItemOption, IonButton, IonToast,
    IonIcon, IonText, CommonModule, CustomFabComponent
  ],
})
export class Tab1Page implements OnInit {
  _inventoryList: Inventory[] = [];
  _title: string = "Inventory List";

  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    addIcons({ pencil, trash, add, camera });
  }

  ngOnInit() {
    this.updateList();
    this.inventoryService.inventoryListChanged$.subscribe((inventoryListChanged: boolean) => {
      if (inventoryListChanged) {
        this.updateList();
      }
    });

    this.inventoryService.triggerError$.subscribe((triggerError: boolean) => {
      if (triggerError) {
        this.presentAlert();
      }
    });
  }

  async updateList() {
    console.log('Updating Inventory List Called');

    this.inventoryService.getInventoryList().subscribe(
      (data: Inventory[]) => {
        console.log('Data from Server TAB: ', data);
        this._inventoryList = data;
        console.log('Inventory List: ', this._inventoryList);
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.error('Error getting inventory list: ', error);
      }
    );
  }

  async deleteItem(inventory: Inventory, index: number, slider: IonItemSliding) {
    if (index > -1) {
      this.inventoryService.deleteInventory(this._inventoryList[index]).subscribe(
        (data: any) => {
          console.log('Delete from Server: ', data);
          this.presentToast(this._inventoryList[index], 'Deleted', 'bottom');
        },
        error => {
          console.error('Error deleting inventory item: ', error);
          slider.close();
        }
      );
    }
  }

  async shareItem(inventory: Inventory, index: number, slider: IonItemSliding) {
    if (index > -1) {
      this.presentToast(this._inventoryList[index], 'Shared', 'bottom');

      const title: string = 'Sharing Inventory Item';
      const text: string = 'Inventory item - Name: ' + this._inventoryList[index].assetName + ' - Quantity: ' + this._inventoryList[index].assetQuantity;

      await Share.share({
        title: title,
        text: text,
      });

      slider.close();
    }
  }

  async addWithModal() {
    const modal = await this.modalCtrl.create({
      component: ModalInputComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data === 'confirm') {
      await this.updateList();
    }
  }


  async addWithCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      if (image.base64String) {
        const formData = new FormData();
        formData.append('assetName', 'New Item'); // You will need to prompt for this
        formData.append('assetQuantity', '1'); // You will need to prompt for this
        formData.append('image', image.base64String);
        // You will need to append other required fields here

        this.inventoryService.addInventory(formData).subscribe(
          (data: any) => {
            console.log('Added new item with image:', data);
            this.presentToast(new Inventory(
              data._id,
              data.assetName,
              data.assetQuantity,
              data.serialNumber,
              data.purchaseDate,
              data.location,
              data.assetTag,
              data.picture,
              data.file,
              data.image
            ), 'Added', 'bottom');
            this.updateList();
          },
          error => {
            console.error('Error adding new item:', error);
            this.presentAlert('Error', 'Failed to add new item with image');
          }
        );
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      this.presentAlert('Error', 'Failed to take picture');
    }
  }

  

  async editWithModal(inventory: Inventory, index: number, slider: IonItemSliding) {
    try {
      const freshInventoryList = await this.inventoryService.getInventoryList().toPromise();
      
      if (freshInventoryList) {
        const updatedInventory = freshInventoryList.find(item => item._id === inventory._id);
        
        if (updatedInventory) {
          const modal = await this.modalCtrl.create({
            component: ModalInputComponent,
            componentProps: {
              _inventory: updatedInventory,
              _index: index
            }
          });
          await modal.present();
          slider.close();
        } else {
          console.error('Inventory item not found');
          // Handle the case where the item is not found
        }
      } else {
        console.error('Failed to fetch inventory list');
        // Handle the case where the inventory list couldn't be fetched
      }
    } catch (error: any) {
      console.error('Error fetching fresh inventory data:', error);
      // Handle error (e.g., show alert)
    }
  }


  async presentToast(inventory: Inventory, action: string, position: 'top' | 'middle' | 'bottom') {
    let name = inventory.assetName;

    try {
      const toast = await this.toastController.create({
        message: name + ' - ' + action,
        duration: 1500,
        position: position
      });

      await toast.present();
    } catch (error) {
      console.error('Error presenting toast: ', error);
    }
  }

  async presentAlert(header: string = 'Server ERROR', message: string = 'Error communicating with server') {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}