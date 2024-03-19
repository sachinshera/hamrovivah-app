import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  @ViewChild('file') file: any;
  isProfilpicUpload = false;
  userProfilePic = '';
  userData: any;
  name = '';

  constructor(
    public userService: UserService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    ) {}

  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.userService
      .getUserDetails()
      .then((data: any) => {
        console.log('user data', data);
        this.userData = data.forms;
        this.name =
          this.getInputvalueByTagname('fullname', this.userData) +
          ' ' +
          this.getInputvalueByTagname('last name', this.userData);

        console.log('this.userData', this.userData);
        if (data.user.proifleImage != null) {
          this.userProfilePic = data.user.proifleImage;
          this.isProfilpicUpload = true;
        }
      })
      .catch((err) => {
        console.log(err);
        this.userProfilePic = '';
      });
  }
  public getInputvalueByTagname(tagname: string, forms: any) {
    for (let i = 0; i < forms.length; i++) {
      for (let j = 0; j < forms[i].Inputs.length; j++) {
        if (forms[i].Inputs[j].tag == tagname) {
          return forms[i].Inputs[j].Values.inputValue;
        }
      }
    }
  }
  inputAttachment() {
    let input: any = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.pdf,.doc,.xls';
    input.multiple = false;
    input.click();

    input.onchange = async () => {
      if (!input.files[0]) {
        return;
      }
      const loading = this.loadingController.create({
        message: 'Uploading file...',
        spinner: 'circles',
        backdropDismiss: false,
      });

      loading.then(loading => loading.present());

      const formData = new FormData();
      formData.append('file', input.files[0]);

      this.userService.uploadFile(formData).then((res: any) => {
        const toast = this.toastController.create({
          message: "File uploaded successfully",
          duration: 2000,
          position: 'bottom'
        });

        toast.then(toast => toast.present());
        loading.then(loading => loading.dismiss());
      }).catch(err => {
        this.toastController.create({
          message: "Unable to upload file, please try again later",
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
