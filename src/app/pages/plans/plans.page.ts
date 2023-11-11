import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  public swiper: any;
  constructor(
    private UserService: UserService,
  ) { }
  public plans: any = [];

  ngOnInit() {
    // get all plans
    this.UserService.getAllPlans()
      .then((data: any) => {
        this.plans = data;
        console.log(this.plans);
      })
      .catch(err => console.log(err));
  }


}
