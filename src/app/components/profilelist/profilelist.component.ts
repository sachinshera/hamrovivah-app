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
      console.log(this.profiles);
    }).catch((err: any) => {
      console.log(err)
    });
  };

  // find input value

  findInputByProfile(id: string, name: string) {
    // find name in profiles.input
    let profle = this.profiles.filter((item: any) => item.id == id);

    let profileData = profle[0]?.Data ? profle[0].Data : [];
    // find name in profileData

    let input = profileData.filter((item: any) => item.Input.inputName == name);
    if (input.length == 0) {
      return ' ';
    }
    return input[0].inputValue;
  }


}
