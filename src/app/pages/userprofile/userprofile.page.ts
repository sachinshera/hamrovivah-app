import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  public api = environment.api;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public profile: ProfileService
  ) { }

  public userid: string = "";
  public profileData: any = {};
  public isLoading = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userid = params['id'];
      this.getProfileById();
    });
  }

  callus() {
    // make a call 
    // dial  +918210071758 in default phone dialer
    window.open(`tel:+918210071758`, '_system');
  };

  getProfileById() {
    this.profile.getProfileById(this.userid)
      .then((data: any) => {
        this.profileData = data.data;
        this.isLoading = false;
        console.log(this.profileData);
      })
      .catch(err => console.log(err));
  };

  @ViewChild("photoModal") modal!: IonModal;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  onWillDismiss(event: Event) {

  };

  openPhotoModal() {
    this.modal.present();
  }

  findInputByTag(tag: string) {
    for (let i = 0; i < this.profileData.forms.length; i++) {
      for (let j = 0; j < this.profileData.forms[i].Inputs.length; j++) {
        if (this.profileData.forms[i].Inputs[j].tag == tag) {
          return this.profileData.forms[i].Inputs[j].Values.inputValue;
        }
      }
    }
  }
}
