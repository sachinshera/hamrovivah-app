import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liked-page-one',
  templateUrl: './liked-page-one.page.html',
  styleUrls: ['./liked-page-one.page.scss'],
})
export class LikedPageOnePage implements OnInit {
  public userid: string = '';
  public profileData: any = {};
  public isLoading = true;
  public userphotopath = '';
  public liked = false;
  public api = environment.api;
  public allusers: any = [];
  likedUsers: any = [];

  constructor(
    private profileService: ProfileService,
    private location: Location,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    this.profileService
      .getProfiles(0)
      .then((res: any) => {
        this.isLoading = false;
        this.allusers = res.data;
        this.likedUsers = this.allusers;
        console.log('allusers', this.allusers);
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  }
  likeAuser() {
    console.log('clicked');
    this.liked = !this.liked;
    this.profileService
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
