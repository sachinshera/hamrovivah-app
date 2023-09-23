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
  public totalInputs = 0;

  public percentage = 0;

  ngOnInit() {
    this.profileService.getFormCategory().then((data: any) => {
      this.form = data.data;
      this.form.forEach((form: any) => {
        form.Inputs.forEach((input: any) => {
          if (input.inputRequired) {
            if (input.Values != undefined && input.Values != null) {
              this.totalFilled += 1;

            };
            this.totalInputs += 1;
          };

        })
      });
      var percentage = Math.round((this.totalFilled / this.totalInputs) * 100);
      this.percentage = percentage;
    }).catch((err: any) => {
      console.log(err)
    });
  };

}
