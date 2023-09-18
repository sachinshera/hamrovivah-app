import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profilequestion',
  templateUrl: './profilequestion.component.html',
  styleUrls: ['./profilequestion.component.scss'],
})
export class ProfilequestionComponent implements OnInit {

  constructor(
    public profileService: ProfileService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  public form: any = [];
  public formId!: number;
  public nextFormId: number = 0;
  public btnText = "Continue";
  public allForm: any = [];
  public dynamicForm!: any;
  public fields: any = [];
  public alertButtons = ['OK'];


  ngOnInit() {
    if (this.allForm.length == 0) {
      this.getform();
    }
    this.formId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  }

  // get form

  getform() {
    this.profileService.getFormCategory().then((data: any) => {
      this.allForm = data.data;
      var formData = data.data[this.formId];
      this.nextFormId = Number(this.formId + 1);
      console.log(this.formId);
      this.form = formData;
      console.log(this.form);
      this.getFormControlsFields();
      if (this.formId == this.allForm.length - 1) {
        this.btnText = "Submit";
      };

    }).catch((err) => { });
  }

  getFormControlsFields() {
    const formGroupFields: any = {};
    for (let i = 0; i < this.form.Inputs.length; i++) {
      let inputName = this.form.Inputs[i].id;
      let inputType = this.form.Inputs[i].inputType;
      let required = this.form.Inputs[i].inputRequired;
      formGroupFields[inputName] = new FormControl("");
      if (required == true) {
        formGroupFields[inputName].setValidators(Validators.required);
        this.fields.push(inputName);
      }
    };

    this.dynamicForm = new FormGroup(formGroupFields);
    console.log(this.dynamicForm);
  }

  async submit() {
    // check if form is valid
    if (this.dynamicForm.valid) {
      // check if form is last form
      if (this.formId == this.allForm.length - 1) {

      } else {
        this.router.navigate(['profilestup/form/', this.nextFormId]);
      }
    }
    else {
      this.toastController.create({}).then((toast) => {
        toast.message = "Please fill all required fields";
        toast.duration = 2000;
        toast.position = "top";
        toast.color = "danger";
        toast.icon = "alert-circle-outline";
        toast.present();
      })
    }
  }

}
