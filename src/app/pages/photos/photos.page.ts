import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActionSheetController, AlertController, ModalController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  public api = environment.api;
  constructor(
    private UserService: UserService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private AlertController: AlertController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public currentPageNumber = 0;
  public userPhotos: any = [];
  public endLoading = false;
  @ViewChild("viewModal") viewModal!: IonModal;
  @ViewChild("imgSlider") imgSlider!: ElementRef;
  public viewCurrentPhoto = "";
  public viewCurrentFilename = "";
  public viewCurrentid = "";
  public skeletonPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public isloading = true;
  public sliderOpts = {
    zoom: false,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: true,
    pagination: true,
  };
  public sliderData: any = [];
  public userId: string = "";
  public backUrl = "/";
  public name = " My Photos";
  public isMyProfile = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.backUrl = "/profile/" + this.userId;
        this.name = params['name'] + " Photos";
      }
    });
    if (this.userId) {
      this.getPhotosByUserId();
    } else {
      this.isMyProfile = true;
      this.getUserPhotos();
    }
    // this.getPhotosByUserId();
    // this.getUserPhotos();
  };

  getPhotosByUserId() {
    this.UserService.getPhotosByUserId(this.userId, this.currentPageNumber).then((res: any) => {
      this.userPhotos = this.userPhotos.concat(res);
      console.log(this.userPhotos);
      if (res.length == 0) {
        this.endLoading = true;
      }
    }).catch(err => {
      console.error(err);
    });
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
      this.toastController.create({
        message: "Unable to delete photo, please try again later",
        duration: 2000,
        position: 'bottom',
        color: 'danger',
        icon: 'close-circle-outline'
      }).then(toast => toast.present());
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
        this.userPhotos.unshift(res);
      }).catch(err => {
        this.toastController.create({
          message: "Unable to upload photo, please try again later",
          duration: 2000,
          position: 'bottom',
          color: 'danger',
          icon: 'close-circle-outline'
        }).then(toast => toast.present());
        loading.then(loading => loading.dismiss());
      });
    };
  };

  // view photo

  async viewPhoto(photo: any) {
    this.sliderData.push(...this.userPhotos);

    // show modal with element ref
    this.viewModal.present();
    this.viewCurrentPhoto = photo;
    // get filename from array

    let current = this.userPhotos.filter((item: any) => {
      return item.file == photo;
    });

    this.viewCurrentFilename = current[0].filename;
    this.viewCurrentid = current[0].id;

    // remove current photo from slider data

    this.sliderData = this.sliderData.filter((item: any) => {
      return item.file !== photo;
    });

    //  add current photo to slider data at first position
    this.sliderData.unshift({
      file: photo,
      filename: this.viewCurrentFilename,
      id: this.viewCurrentid
    });
  };

  // close modal view

  closeModalView() {
    this.viewModal.dismiss();
    this.sliderData = [];
  };

  // download 

  downloadCurrent() {
    let url = this.viewCurrentPhoto;
    let filename = this.viewCurrentFilename;
  };

  // share

  async shareCurrent() {
    let url = this.viewCurrentPhoto;
    let filename = this.viewCurrentFilename;
    // check share api available 
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

  // next slide

  nextSlide() {
    this.imgSlider.nativeElement.swiper.slideNext();
  };

  // prev slide

  prevSlide() {
    this.imgSlider.nativeElement.swiper.slidePrev();
  };
  onSlideChange() {
    console.log("slide change");
    let currentIndexSliderData = this.sliderData[this.imgSlider.nativeElement.swiper.realIndex];
    this.viewCurrentFilename = currentIndexSliderData.filename;
    this.viewCurrentid = currentIndexSliderData.id;
    this.viewCurrentPhoto = currentIndexSliderData.file;
  }

}
