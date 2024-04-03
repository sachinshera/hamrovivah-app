import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  IonModal,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { Capacitor } from '@capacitor/core';
import { FileOpener } from '@capacitor-community/file-opener';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {
  profileDescription =
    'a passionate dermatologist dedicated to enhancing skin health and boosting confidence. With 8 years of experience, I offer personalized care and innovative treatments to help you achieve glowing skin. Excited to be part of your journey toward love and happiness.';
  dataInChips = [
    { key: 'created', value: 'Created by Self' },
    { key: 'language', value: 'Hindi' },
    { key: 'religion', value: 'Christian' },
    { key: 'smokes', value: 'Smokes' },
    { key: 'drinks', value: 'Occassionally' },
  ];
  dataInList = [
    { key: 'Marital Status', value: 'Never Married' },
    { key: 'Born Date', value: '11/01/1985' },
    { key: 'Lives in', value: 'Dehradun, uttarakhand, India' },
    { key: 'Diet', value: 'Vegetarian' },
  ];
  interests = [
    'Self care',
    'Photography',
    'Crafting',
    'Vegan/vegetarian',
    'Mentorship programs',
    'Art/design',
    'Language learning',
  ];
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public profile: ProfileService
  ) {}
  public userid: string = '';
  public profileData: any = {};
  public isLoading = true;
  public userphotopath = '';
  public liked = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userid = params['id'];
      this.getProfileById();
    });
  }

  callus() {
    // make a call
    // dial  +918210071758 in default phone dialer
    window.open(`tel:+918210071758`, '_system');
  }

  likeAuser() {
    console.log('clicked');
    this.liked = !this.liked;
    this.profile
      .likeUser(this.userid)
      .then((data: any) => {
        console.log('like data', data);
        this.toastController
          .create({
            message: 'Liked',
            duration: 5000,
          })
          .then((toast: any) => {
            console.log('here');
            toast.present();
          });
      })
      .catch((err) => {
        console.log('err like', err);
        this.toastController
          .create({
            message: err.message,
            duration: 5000,
          })
          .then((toast: any) => {
            toast.present();
          });
      });
  }

  getProfileById() {
    this.profile
      .getProfileById(this.userid)
      .then((data: any) => {
        console.log(data);
        this.profileData = data.data;
        this.isLoading = false;
        this.liked = this.profileData.Liked;
      })
      .catch((err) => console.log(err));
  }

  @ViewChild('photoModal') modal!: IonModal;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss();
  }

  onWillDismiss(event: Event) {}

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

  openLink(link: string) {
    // check if platform is web
    if (Capacitor.isNativePlatform()) {
      FileOpener.open({ filePath: link })
        .then((data) => {})
        .catch((err) => {
          console.log('falied to open file', err);
        });
    } else {
      window.open(link, '_blank');
      return;
    }
  }

  handleRefresh(event: any) {
    this.profileData = {};
    this.isLoading = true;

    this.profile
      .getProfileById(this.userid)
      .then((data: any) => {
        console.log(data);
        this.profileData = data.data;
        this.isLoading = false;
        this.liked = this.profileData.Liked;
        event.target.complete();
      })
      .catch((err) => {
        console.log(err);
        event.target.complete();
      });
  }

  onBack() {
    this.location.back();
  }
  getName(user: any) {
    let userName =
      this.getInputvalueByTagname('fullname', user) +
      ' ' +
      this.getInputvalueByTagname('last name', user);
    return userName;
  }
  getAge(user: any) {
    let age = '26Yrs';
    return age;
  }
  getProfession(user: any) {
    let userName = this.getInputvalueByTagname('work', user);
    return userName;
  }
  public getInputvalueByTagname(tagname: string, forms: any) {
    if (!!forms) {
      for (let i = 0; i < forms.length; i++) {
        for (let j = 0; j < forms[i].Inputs.length; j++) {
          if (forms[i].Inputs[j].tag == tagname) {
            if (!!forms[i].Inputs[j].Values) {
              return forms[i].Inputs[j].Values.inputValue;
            } else {
              return '';
            }
          }
        }
      }
    }
  }
}
