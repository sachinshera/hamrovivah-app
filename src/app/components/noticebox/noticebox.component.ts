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

      let percentage = (this.totalFilled / this.totalInputs) * 100;
      this.percentage = Math.round(percentage);
      console.log(this.percentage);
    }).catch((err: any) => {
      console.log(err)
    });
  };

}
