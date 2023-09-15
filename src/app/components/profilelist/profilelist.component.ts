import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.scss'],
})
export class ProfilelistComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

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
  ]

}
