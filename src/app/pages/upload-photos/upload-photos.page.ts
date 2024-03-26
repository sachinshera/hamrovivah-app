import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.page.html',
  styleUrls: ['./upload-photos.page.scss'],
})
export class UploadPhotosPage implements OnInit {

  constructor(
    private loadingController: LoadingController,
    private UserService: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }
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
        // this.userPhotos.unshift(res);
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
}
