import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profilequestion',
  templateUrl: './profilequestion.component.html',
  styleUrls: ['./profilequestion.component.scss'],
})
export class ProfilequestionComponent implements OnInit {
  public api = environment.api;
  constructor(
    public profileService: ProfileService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public alertController: AlertController,
    public userService: UserService,
    public loadingController: LoadingController
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
  public isProfilpicUpload = false;
  public userProfilePic = "";
  public userUploadedPic: any;
  public loading: any;
  public skeletons = [0, 1, 3, 4, 5, 6, 7, 8, 9, 7, 8, 9];
  public isLoading = true;
  public filesTypesInputs: any = [];


  ngOnInit() {
    if (this.allForm.length == 0) {
      this.getform();
    }
    this.formId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserData();
  }

  // get form

  getform() {
    this.isLoading = true;
    this.profileService.getFormCategory().then((data: any) => {
      // check if any form has not any inputs then remove from all form
      this.allForm = data.data.filter((form: any) => {
        return form.Inputs.length > 0;
      });
      if (data.data.length > 0) {
        this.isLoading = false;
      } else {
        let alert = this.alertController.create({
          header: "No Form",
          message: "No form available, please contact to hamrovivah team",
          buttons: [
            {
              text: "OK",
              handler: () => {
                this.router.navigate(['/']);
              }
            }
          ]
        });
        alert.then((alert) => {
          alert.present();
        });
      }
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
      else if (this.formId == "partner") {
        for (let i = 0; i < this.allForm.length; i++) {
          if (this.allForm[i].tags == "partner") {
            this.form = this.allForm[i];
            this.btnText = "Save";
            this.isLastForm = true;
          }
        }
      }
      else {
        let formData = this.allForm[0];
        formData = data.data[Number(this.formId)];
        this.nextFormId = Number(this.formId) + 1;
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

    }).catch((err) => {
      this.toastController.create({
        message: err,
        duration: 2000,
        position: "top",
        color: "danger",
        icon: "alert-circle-outline"
      }).then((toast) => {
        toast.present();
      })
    });
  }

  getFormControlsFields() {
    const formGroupFields: any = {};
    for (let i = 0; i < this.form.Inputs.length; i++) {
      let inputName = this.form.Inputs[i].id;
      let inputType = this.form.Inputs[i].inputType;
      let required = this.form.Inputs[i].inputRequired;
      let value = this.form.Inputs[i].Values?.inputValue;
      if (inputType == "file") {
        this.filesTypesInputs.push(inputName);
      }
      formGroupFields[inputName] = new FormControl(value);
      if (required == true) {
        formGroupFields[inputName].setValidators(Validators.required);
        // formGroupFields[inputName].setValue(value)
        this.fields.push(inputName);
      }
    };

    this.dynamicForm = new FormGroup(formGroupFields);
  };


  reselectFile(inputId: any) {
    this.form.Inputs.forEach((input: any) => {
      if (input.id == inputId) {
        input.Values.inputValue = "";
      }
    })
  };

  openLink(link: any) {
    window.open(link, "_blank");
  }

  onFileSelect(input: any, inputId: any) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Got here: ', e.target.result);
        this.dynamicForm.controls[inputId].setValue(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  async submit() {
    // check if form is valid
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm);
      //  convet form value to array
      let formValue = Object.entries(this.dynamicForm.value);

      let bindedFormValue: any = [];

      // bind form value with input id

      for (let i = 0; i < formValue.length; i++) {
        let inputId = formValue[i][0];
        let inputValue = formValue[i][1];
        // check if input type is not file
        // if (this.filesTypesInputs.includes(inputId) == false) {
        //   bindedFormValue.push({
        //     inputId: inputId,
        //     inputValue: inputValue
        //   });
        // };

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
          // check if form is unfilled form
          if (this.formId == "unfilled" || this.formId == "partner") {
            this.router.navigate(['/profilestup/form/success']);
          }

          // check form id is 0 and profile pic is not uploaded
          else if (this.formId == 0 && this.isProfilpicUpload == false) {
            this.alertController.create({
              header: "Profile Pic",
              message: "Please upload profile pic",
              buttons: this.alertButtons
            }).then((alert) => {
              alert.present();
            });
          }

          else if (this.formId == this.allForm.length - 1) {
            this.router.navigate(['/profilestup/form/success']);
          } else {
            this.router.navigate(['profilestup/form/', this.nextFormId]);
          }

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
    console.log("unfilled", this.allForm);
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
      console.log("un", unfilledFields);
    };

    return unfilledFields;
  }

  // get user data

  getUserData() {
    this.userService.getUserDetails().then((data: any) => {
      if (data.proifleImage != null) {
        this.userProfilePic = data.proifleImage;
        this.isProfilpicUpload = true;
      }
    }).catch((err) => {
      console.log(err);
      this.userProfilePic = "";
    });
  };

  changeProfilePic() {
    let input = document.createElement("input");
    input.type = "file";
    input.click();
    input.onchange = (e: any) => {
      this.userUploadedPic = e.target.files[0];
      let formData = new FormData();
      formData.append("file", this.userUploadedPic);
      this.loading = this.loadingController.create({
        message: "Uploading profile pic..."
      });
      this.loading.then((load: any) => {
        load.present();
      });
      this.userService.uploadProfilePic(formData).then((data: any) => {
        this.userProfilePic = data.proifleImage;
        let toast = this.toastController.create({
          message: "Profile pic uploaded successfully",
          duration: 2000,
          position: "bottom",
          color: "success",
          icon: "checkmark-circle-outline"
        });
        toast.then((toast) => {
          toast.present();
        });
        this.loading.then((load: any) => {
          load.dismiss();
        });
        this.isProfilpicUpload = true;
      }).catch((err) => {
        this.alertController.create({
          header: "Error",
          message: "Error while uploading profile pic",
        }).then((alert) => {
          alert.present();
        });
        this.loading.then((load: any) => {
          load.dismiss();
        })
      });
    }
  }


}
