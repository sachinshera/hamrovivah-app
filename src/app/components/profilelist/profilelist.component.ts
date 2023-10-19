import { Component, OnInit, Input } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.scss'],
})
export class ProfilelistComponent implements OnInit {
  public api = environment.api;
  @Input() heading = 'Profile List';
  @Input() showMoreBtn = false;



  @Input() profiles: any = [];
  constructor(
    public profileService: ProfileService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    console.log(this.profiles);
  }

}
