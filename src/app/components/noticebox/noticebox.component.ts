import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-noticebox',
  templateUrl: './noticebox.component.html',
  styleUrls: ['./noticebox.component.scss'],
})
export class NoticeboxComponent implements OnInit {

  constructor(
    public profileService: ProfileService
  ) { }

  public form: any = [];
  public totalFilled: number = 0;
  public totalInputs: number = 0;

  public percentage = 0;

  ngOnInit() {
    this.profileService.getFormCategory().then((data: any) => {
      this.form = data.data;
      var percentage = Math.round((this.totalFilled / this.totalInputs) * 100);
      this.percentage = percentage;
      console.log(this.percentage);
      console.log("total filled: " + this.totalFilled);
      console.log("total inputs: " + this.totalInputs)
    }).catch((err: any) => {
      console.log(err)
    });
  };

}
