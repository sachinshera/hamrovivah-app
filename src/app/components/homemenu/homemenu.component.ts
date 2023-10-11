import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
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
      this.name = userdata.name;
      this.mobile = userdata.mobile;
      this.profilePic = userdata.proifleImage;
      console.log(userdata);
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
  }

}
