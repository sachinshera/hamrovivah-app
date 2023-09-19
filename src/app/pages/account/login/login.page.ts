import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(
    public toastController: ToastController
  ) {

  }

  async ngOnInit() {
    // await FacebookLogin.initialize({ appId: environment.facebookAppId });
  }

  public userMobileNumber = '';
  async loginwithgoogle() {

  }
  async loginwithfacebook() {
    // const FACEBOOK_PERMISSIONS = [
    //   'public_profile'
    // ];
    // const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    // console.log(result);
  };
  async loginwithmobile() {

  }
}
