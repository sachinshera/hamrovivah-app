import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { Share } from '@capacitor/share';
@Component({
  selector: 'app-homemenu',
  templateUrl: './homemenu.component.html',
  styleUrls: ['./homemenu.component.scss'],
})
export class HomemenuComponent implements OnInit {
  public name: string = "";
  public mobile: string = "";
  public profilePic: any = null;
  public api = environment.api;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginService.getUserData().then((userdata) => {
      // userdata = JSON.parse(userdata);
      this.name = this.getInputvalueByTagname('fullname', userdata.forms);
      this.mobile = userdata.user.mobile;
      this.profilePic = userdata.user.proifleImage;
    }).catch((err) => {
      console.log(err)
    });

    console.log(this.profilePic);
  };

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
    let toast = this.toastController.create({
      message: "Logged out successfully",
      duration: 2000,
      color: "success",
      position: "top",
      cssClass: "toast",
    });

    toast.then((toast) => {
      toast.present();
    });
  };

  async shareThisApp() {

    if (!await Share.canShare()) {
      // show toast
      this.toastController.create({
        message: "Your device does not support sharing",
        duration: 2000,
        color: "danger",
        position: "bottom",
        cssClass: "toast",
      }).then((toast) => {
        toast.present();
      });
    };

    try {
      await Share.share({
        title: "Hamro Vivah",
        text: "Download Hamro Vivah App for free",
        url: "https://play.google.com/store/apps/details?id=com.hamrovivah.app",
        dialogTitle: "Share with your friends",
      });
    } catch (err: any) {
      this.toastController.create({
        message: err.message,
        duration: 2000,
        color: "danger",
        position: "bottom",
        cssClass: "toast",
      }).then((toast) => {
        toast.present();
      });
    }
  };

  public getInputvalueByTagname(tagname: string, forms: any) {
    for (let i = 0; i < forms.length; i++) {
      for (let j = 0; j < forms[i].Inputs.length; j++) {
        if (forms[i].Inputs[j].tag == tagname) {
          return forms[i].Inputs[j].Values.inputValue;
        }
      }
    }
  }

}
