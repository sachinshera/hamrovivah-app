import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { StorageService } from './services/storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private storageService: StorageService
  ) {
    register();
  };

  async ngOnInit() {

  }
}
