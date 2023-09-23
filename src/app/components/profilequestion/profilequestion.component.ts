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
  public formId!: any;
  public nextFormId: number = 0;
  public btnText = "Save & Next";
  public allForm: any = [];
  public dynamicForm!: any;
  public fields: any = [];
  public alertButtons = ['OK'];
  public skipText = "Skip";
  public isLastForm = false;


  ngOnInit() {
    if (this.allForm.length == 0) {
      this.getform();
    }
    this.formId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  // get form

  getform() {
    this.profileService.getFormCategory().then((data: any) => {
      // check if any form has not any inputs then remove from all form
      this.allForm = data.data.filter((form: any) => {
        return form.Inputs.length > 0;
      });
      if (this.formId == "unfilled") {
        let formData: any = {};
        formData.name = "Unfilled Data";
        this.btnText = "Finish";
        formData.Inputs = [];
        this.form = formData;
        let unfilledInputs = this.getUnfilledFields();
        // get unfilled inputs from all form

        for (let i = 0; i < unfilledInputs.length; i++) {
          let formId = unfilledInputs[i].formId;
          let inputId = unfilledInputs[i].inputId;
          for (let j = 0; j < this.allForm.length; j++) {
            if (this.allForm[j].id == formId) {
              for (let k = 0; k < this.allForm[j].Inputs.length; k++) {
                if (this.allForm[j].Inputs[k].id == inputId) {
                  formData.Inputs.push(this.allForm[j].Inputs[k]);
                }
              }
            }
          }
        };
      }
      else {
        let formData = this.allForm[0];
        formData = data.data[Number(this.formId)];
        this.nextFormId = Number(this.formId + 1);
        this.form = formData;
      }
      this.getFormControlsFields();
      if (this.formId == this.allForm.length - 1) {
        this.btnText = "Submit";
      };

      if (this.formId == this.allForm.length - 1) {
        this.skipText = "Skip";
        this.isLastForm = true;
      };

    }).catch((err) => { });
  }

  getFormControlsFields() {
    const formGroupFields: any = {};
    for (let i = 0; i < this.form.Inputs.length; i++) {
      let inputName = this.form.Inputs[i].id;
      let inputType = this.form.Inputs[i].inputType;
      let required = this.form.Inputs[i].inputRequired;
      let value = this.form.Inputs[i].Values?.inputValue || "";
      formGroupFields[inputName] = new FormControl("");
      if (required == true) {
        formGroupFields[inputName].setValidators(Validators.required);
        formGroupFields[inputName].setValue(value)
        this.fields.push(inputName);
      }
    };

    this.dynamicForm = new FormGroup(formGroupFields);
    console.log(this.dynamicForm);
  }

  async submit() {

    console.log("submit", this.dynamicForm.value);
    // check if form is valid
    if (this.dynamicForm.valid) {
      //  convet form value to array
      let formValue = Object.entries(this.dynamicForm.value);

      let bindedFormValue: any = [];

      // bind form value with input id

      for (let i = 0; i < formValue.length; i++) {
        let inputId = formValue[i][0];
        let inputValue = formValue[i][1];
        bindedFormValue.push({
          inputId: inputId,
          inputValue: inputValue
        });
      };

      // update values



      // check if form is last form
      if (this.formId == this.allForm.length - 1) {
        this.profileService.updateValues(bindedFormValue).then((data: any) => {
          this.router.navigate(['/profilestup/form/success']);
        }).catch((err) => {
          let toast = this.toastController.create({
            message: err,
            duration: 2000,
            position: "top",
            color: "danger",
            icon: "alert-circle-outline"
          });
          toast.then((toast) => {
            toast.present();
          });
        });
      } else {
        this.profileService.updateValues(bindedFormValue).then((data: any) => {
          this.router.navigate(['profilestup/form/', this.nextFormId]);
        }).catch((err) => {
          let toast = this.toastController.create({
            message: err,
            duration: 2000,
            position: "top",
            color: "danger",
            icon: "alert-circle-outline"
          });
          toast.then((toast) => {
            toast.present();
          });
        });
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
  };


  // get percentage of total form according to form id

  getPercentage() {
    return (Math.round((this.formId / this.allForm.length) * 100) / 100) + 0.10;
  }

  skip() {
    this.router.navigate(['profilestup/form/', this.nextFormId]);
  };

  // get unfilled fields  with category 

  getUnfilledFields() {
    let unfilledFields: any = [];
    //   data from all form
    for (let i = 0; i < this.allForm.length; i++) {
      // data from each form
      for (let j = 0; j < this.allForm[i].Inputs.length; j++) {
        let inputId = this.allForm[i].Inputs[j].id;
        let inputValue = this.allForm[i].Inputs[j].Values?.inputValue;
        let inputRequired = this.allForm[i].Inputs[j].inputRequired;
        if (inputRequired == true && (inputValue == "" || inputValue == undefined)) {
          unfilledFields.push({
            inputId: inputId,
            formId: this.allForm[i].id
          });
        }
      }
    };

    return unfilledFields;
  }


}
