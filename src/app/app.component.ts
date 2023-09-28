import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(

  ) {
    register();
  };

  async ngOnInit() {

  }
}
