import { Component, OnInit, Input } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.scss'],
})
export class ProfilelistComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.getProfiles();
  }

  profileList: any[] = [
    {
      "Fullname": "sachin kumar",
      "Address": "Banka,Bihar",
      "Age": "22 Yrs",
      "Profession": "Software Engineer",
      "Religion": "Hindu",
      "ProfilePic": "https://randomuser.me/api/portraits/men/12.jpg",
      "Height": "5 Ft 5 Inch"
    },
    {
      "Fullname": "sachin kumar",
      "Address": "Banka,Bihar",
      "Age": "22 Yrs",
      "Profession": "Software Engineer",
      "Religion": "Hindu",
      "ProfilePic": "https://randomuser.me/api/portraits/men/86.jpg",
      "Height": "5 Ft 5 Inch"
    },
    {
      "Fullname": "sachin kumar",
      "Address": "Banka,Bihar",
      "Age": "22 Yrs",
      "Profession": "Software Engineer",
      "Religion": "Hindu",
      "ProfilePic": "https://randomuser.me/api/portraits/men/31.jpg",
      "Height": "5 Ft 5 Inch"
    },
    {
      "Fullname": "sachin kumar",
      "Address": "Banka,Bihar",
      "Age": "22 Yrs",
      "Profession": "Software Engineer",
      "Religion": "Hindu",
      "ProfilePic": "https://randomuser.me/api/portraits/men/80.jpg",
      "Height": "5 Ft 5 Inch"
    }
  ];

  public profiles: any = [];
  public currentPage: number = 0;

  getProfiles() {
    this.profileService.getProfiles(this.currentPage).then((data: any) => {
      this.profiles = data.data;
    }).catch((err: any) => {
      console.log(err)
    });
  };
}
