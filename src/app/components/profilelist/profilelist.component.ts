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
    console.log("profiles", this.profiles);
    console.log(this.getInputvalueByTagname('fullname', this.profiles[0].forms));
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
