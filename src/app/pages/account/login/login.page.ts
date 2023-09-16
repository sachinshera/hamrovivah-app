import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() {

  }

  async ngOnInit() {
    GoogleAuth.initialize({
      clientId: '458774791962-al95v5jospkdn2j42brol8m6kitb00p7.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });

    await FacebookLogin.initialize({ appId: '280034274792025' });
  }
  async Googlelogin() {
    let login = await GoogleAuth.signIn();
    console.log('my data: ', login);
  }

  async facebookLogin() {
    const FACEBOOK_PERMISSIONS = [
      "public_profile"
    ];
    const result = await (<any>(
      FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS })
    ));

    if (result.accessToken) {
      // Login successful.
      console.log(`Facebook access token is ${result.accessToken.token}`);
    }
  }

}
