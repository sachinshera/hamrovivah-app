import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Capacitor } from '@capacitor/core';
import { App, App as CapacitorApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showCustomSplash = true;
  constructor(

  ) {
    register();
  };

  async ngOnInit() {
    if (Capacitor.isPluginAvailable('App')) {
      CapacitorApp.addListener('backButton', () => {
        if (window.location.pathname == '/home') {
          CapacitorApp.exitApp();
        }
      });
    };

    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    };
  };
}
