import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  constructor(
    private UserService: UserService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private AlertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  public currentPageNumber = 0;
  public userPhotos: any = [];
  public endLoading = false;
  @ViewChild("viewModal") viewModal!: IonModal;
  public viewCurrentPhoto = "";
  public viewCurrentFilename = "";
  public viewCurrentid = "";
  public skeletonPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public isloading = true;

  ngOnInit() {
    this.getUserPhotos();
  }

  getUserPhotos() {
    this.UserService.getUsersPhotos(this.currentPageNumber).then((res: any) => {
      this.userPhotos = this.userPhotos.concat(res);
      console.log(this.userPhotos);
      if (res.length == 0) {
        this.endLoading = true;
      }
    }).catch(err => {
      console.error(err);
    });
  };

  onIonInfinite(event: any) {
    if (this.endLoading) {
      event.target.complete();
      return;
    }
    this.currentPageNumber++;
    this.getUserPhotos();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  };

  handleRefresh(event: any) {
    this.currentPageNumber = 0;
    this.userPhotos = [];
    this.endLoading = false;
    this.getUserPhotos();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  };

  // photos actions

  async photosActions(photo: any) {
    console.log(photo);
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'View',
          icon: 'eye',
          handler: () => {
            this.viewPhoto(photo);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            this.deletePhoto(photo);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  };

  // delete photo

  deletePhoto(photo: any) {
    const loading = this.loadingController.create({
      message: 'Deleting photo...',
      spinner: 'circles',
      duration: 2000,
    });

    loading.then(loading => loading.present());

    this.UserService.deletePhoto(photo).then(() => {
      const toast = this.toastController.create({
        message: "Photo deleted successfully",
        duration: 2000,
        position: 'bottom'
      });

      toast.then(toast => toast.present());
      loading.then(loading => loading.dismiss());

      // remove photo from array
      this.userPhotos = this.userPhotos.filter((item: any) => {
        return item.id !== photo;
      });
    }).catch(err => {
      console.error(err);
    });
  };

  // upload photo

  async uploadPhoto() {
    let input: any = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    input.click();

    input.onchange = async () => {
      if (!input.files[0]) {
        return;
      }
      const loading = this.loadingController.create({
        message: 'Uploading photo...',
        spinner: 'circles',
        backdropDismiss: false,
      });

      loading.then(loading => loading.present());

      const formData = new FormData();
      formData.append('file', input.files[0]);

      this.UserService.uploadFile(formData).then((res: any) => {
        const toast = this.toastController.create({
          message: "Photo uploaded successfully",
          duration: 2000,
          position: 'bottom'
        });

        toast.then(toast => toast.present());
        loading.then(loading => loading.dismiss());

        // add photo to array
        this.userPhotos.unshift(res);
        console.log(res);
        console.log(this.userPhotos);
      }).catch(err => {
        console.error(err);
      });
    };
  };

  // view photo

  async viewPhoto(photo: any) {
    // show modal with element ref
    this.viewModal.present();
    this.viewCurrentPhoto = photo;
    // get filename from array

    let current = this.userPhotos.filter((item: any) => {
      return item.file == photo;
    });

    this.viewCurrentFilename = current[0].filename;
    this.viewCurrentid = current[0].id;
  };

  // close modal view

  closeModalView() {
    this.viewModal.dismiss();
  };

  // download 

  downloadCurrent() {
    let url = this.viewCurrentPhoto;
    let filename = this.viewCurrentFilename;

    // check permission

    Filesystem.checkPermissions().then((res: any) => {
      console.log(res);
      if (res.publicStorage == "granted") {
        console.log("permission granted");
      } else {
        console.log("permission not granted");
        Filesystem.requestPermissions().then((res: any) => {
          console.log(res);
          if (res.publicStorage == "granted") {
            console.log("permission granted");
          } else {
            console.log("permission not granted");
          }
        }).catch(err => {
          console.error(err);
        });
      }
    })

    // download in user system

    Filesystem.writeFile({
      path: filename,
      data: url,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    }).then((res: any) => {
      console.log(res);
      const toast = this.toastController.create({
        message: "Photo downloaded successfully",
        duration: 2000,
        position: 'bottom'
      });

      toast.then(toast => toast.present());
    }).catch(err => {
      console.error(err);
    }).catch(err => {
      console.error(err);
    })
  };

  // share

  shareCurrent() {
    let url = this.viewCurrentPhoto;
    let filename = this.viewCurrentFilename;
  };

  // delete current

  deleteCurrent() {
    this.deletePhoto(this.viewCurrentid);
    this.viewModal.dismiss();
  };

  logingImg($id: any) {
    // show skeleton
    console.log("loading", $id);

    // select img class prev-{{id}}

    let img = document.querySelector(".prev-" + $id);

    // select skeleton class ske-{{id}}

    let ske = document.querySelector(".ske-" + $id);

    // show skeleton and hide img

    img?.classList.add("hide");
    ske?.classList.remove("hide");
  }

  imgLoadError($id: any) {
    console.log("error load", $id);

    // select img class prev-{{id}}

    let img = document.querySelector(".prev-" + $id);

    // select skeleton class ske-{{id}}

    let ske = document.querySelector(".ske-" + $id);

    // show skeleton and hide img

    img?.classList.add("hide");

    ske?.classList.remove("hide");
  };

  imageLoaded($id: any) {
    console.log("loaded", $id);

    // select img class prev-{{id}}

    let img = document.querySelector(".prev-" + $id);

    // select skeleton class ske-{{id}}

    let ske = document.querySelector(".ske-" + $id);

    // show skeleton and hide img

    img?.classList.remove("hide");

    ske?.classList.add("hide");
  }
}
