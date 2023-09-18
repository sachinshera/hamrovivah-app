import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profilequestion',
  templateUrl: './profilequestion.component.html',
  styleUrls: ['./profilequestion.component.scss'],
})
export class ProfilequestionComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  public form: any = [];
  public formId: any;
  public nextFormId: number = 0;

  ngOnInit() {
    this.getform();
    this.formId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  // get form

  getform() {
    this.profileService.getFormCategory().then((data: any) => {
      var formData = data.data[this.formId];
      // if forData order is 0 then it will at first position in array using sort method

      formData.Inputs.sort((a: any, b: any) => {
        return a.order - b.order;
      });
      this.form = formData;

      console.log(this.form)

      // get next array index

      this.nextFormId = data.data.length - (this.formId + 1);


    }).catch((err) => { });
  }

}
