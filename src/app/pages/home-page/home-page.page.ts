import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  public api = environment.api;
  public allusers: any = [];
  public prefrencesProfiles: any = [];
  public isLoading = true;
  isProfilpicUpload = false;
  userProfilePic = '';
  userData: any;
  name = '';
  public allMatches: any = [];
  public newMatches: any = [];
  public recentVisiors: any = [];
  public form: any = [];
  public totalFilled: number = 0;
  public totalInputs: number = 0;
  public percentage = 0;

  constructor(
    public profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.profileService
      .getProfiles(0)
      .then((res: any) => {
        this.isLoading = false;
        this.allusers = res.data;
        this.allMatches = this.allusers;
        this.newMatches = this.allusers;
        this.recentVisiors = this.allusers
        console.log('allusers', this.allusers)
      })
      .catch((err: any) => {
        console.log('err', err);
      });

    this.profileService
      .getPfofilesByPrefrences(0)
      .then((res: any) => {
        this.isLoading = false;
        this.prefrencesProfiles = res.data;
      })
      .catch((err: any) => {
        console.log('err', err);
      });

    this.userService
      .getUserDetails()
      .then((data: any) => {
        console.log('user data', data);
        this.userData = data.forms;
        this.name =
          this.getInputvalueByTagname('fullname', this.userData) +
          ' ' +
          this.getInputvalueByTagname('last name', this.userData);

        console.log('this.userData', this.userData);
        if (data.user.proifleImage != null) {
          this.userProfilePic = data.user.proifleImage;
          this.isProfilpicUpload = true;
        }
      })
      .catch((err) => {
        console.log(err);
        this.userProfilePic = '';
      });

      this.profileService.getFormCategory().then((data: any) => {
        this.form = data.data;


        for (let i = 0; i < this.form.length; i++) {
          for (let j = 0; j < this.form[i].Inputs.length; j++) {
            if (this.form[i].Inputs[j].inputRequired) {
              this.totalInputs++;
              if (this.form[i].Inputs[j].Values !== null) {
                this.totalFilled++;
              }
            }
          };
          console.log(this.totalInputs);
        }

        let percentage = (this.totalFilled / this.totalInputs);
        this.percentage = Math.round(percentage);
        console.log(this.percentage);
      }).catch((err: any) => {
        console.log(err)
      });
  }
  getName(user: any){
    let userName =
    this.getInputvalueByTagname('fullname', user) +
    ' ' +
    this.getInputvalueByTagname('last name', user);
    return userName;
  }
  getAge(user: any){
    let age = '26Yrs'
    return age;
  }
  getProfession(user: any){
    let userName =
    this.getInputvalueByTagname('work', user)
    return userName;
  }
  public getInputvalueByTagname(tagname: string, forms: any) {
    for (let i = 0; i < forms.length; i++) {
      for (let j = 0; j < forms[i].Inputs.length; j++) {
        if (forms[i].Inputs[j].tag == tagname) {
          if(!!forms[i].Inputs[j].Values){
            return forms[i].Inputs[j].Values.inputValue;
          }else{
            return ''
          }
        }
      }
    }
  }
  handleRefresh(event: any) {
    this.allusers = [];
    this.profileService
      .getProfiles(0)
      .then((res: any) => {
        this.isLoading = false;
        this.allusers = res.data;
        event.target.complete();
      })
      .catch((err: any) => {
        console.log('err', err);
        event.target.complete();
      });
  }
}
