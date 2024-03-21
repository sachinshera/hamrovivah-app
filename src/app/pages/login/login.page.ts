import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  zeroethForm!: FormGroup; //form declaration
  countryCodeOptions = ['+91', '+977']; //options to show for country code field
  public userMobileNumber: any = '';
  public userCountryCode: any = '';
  public showOtpBox = false;
  public userOtp = '';
  private otpToken = '';
  public resentBtnText = 'Re Send';
  public reSendTimer = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public loginService: LoginService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // form declaration
    this.zeroethForm = this.formBuilder.group({
      countryCode: [this.userMobileNumber, Validators.required],
      phone: ['', Validators.required],
    });
    this.loginService.getUserCountryByIp().then((res: any) => {
      let code = res.country_calling_code;
      if (code) {
        console.log('code', code);
        this.zeroethForm?.controls['countryCode'].setValue(code);
      }
    });
  }
  // Function to get the countryCode control from the form
  get countryCode() {
    return this.zeroethForm.get('countryCode');
  }
  // Function to get the phone control from the form
  get phone() {
    return this.zeroethForm.get('phone');
  }
  // function on Continue button clicked
  async loginwithmobile() {
    if (this.zeroethForm.valid) {
      console.log('Form submitted with data:', this.zeroethForm.value);
      this.userCountryCode = this.zeroethForm.value.countryCode;
      this.userMobileNumber = this.zeroethForm.value.phone;

      // check if user has entered mobile number
      if (this.userMobileNumber == null || this.userMobileNumber == undefined) {
        const toast = await this.toastController.create({
          message: 'Please enter mobile number',
          duration: 2000,
        });
        toast.present();
        return;
      }

      // check if user has selected country code

      if (this.userCountryCode == null || this.userCountryCode == undefined) {
        const toast = await this.toastController.create({
          message: 'Please select country code',
          duration: 2000,
        });
        toast.present();
        return;
      }

      // check number of digits in mobile number

      if (this.userMobileNumber.length < 10) {
        const toast = await this.toastController.create({
          message: 'Please enter valid mobile number',
          duration: 2000,
        });
        toast.present();
        return;
      }

      // check number is type of number

      if (isNaN(this.userMobileNumber)) {
        const toast = await this.toastController.create({
          message: 'Please enter valid mobile number',
          duration: 2000,
        });
        toast.present();
        return;
      }

      // confirm user mobile number is correct

      const showConfirm = async () => {
        const { value } = await Dialog.confirm({
          title: 'Confirm',
          message: `Is ${this.userCountryCode} ${this.userMobileNumber} your mobile number?`,
          okButtonTitle: 'Yes',
        });
        if (value) {
          // show loading
          var sendOtpLoading = this.loadingController.create({
            duration: 2000,
            animated: true,
            message: 'sending otp ...',
            spinner: 'circles',
          });

          (await sendOtpLoading).present();
          let phoneNumber = this.userCountryCode + this.userMobileNumber;
          this.loginService
            .initiateLoginOtpRequest(phoneNumber)
            .then(async (res: any) => {
              this.otpToken = res.token;
              this.showOtpBox = true;

              (await sendOtpLoading).dismiss();

              // show success toast
              const toast = this.toastController.create({
                message: 'OTP sent to your mobile number',
                duration: 2000,
                color: 'success',
                position: 'bottom',
              });
              toast.then((toast) => {
                toast.present();
              });
              this.setResendTimer();
              this.presentAlert();
            })
            .catch(async (err: any) => {
              // show error message
              (await sendOtpLoading).dismiss();
              const toast = this.toastController.create({
                message: err.error.message,
                duration: 2000,
                color: 'danger',
                position: 'bottom',
              });
              toast.then((toast) => {
                toast.present();
              });
            });
        } else {
          this.showOtpBox = false;
        }
      };
      showConfirm();

      // this.router.navigate(['fourth-form'])
    }
  }

  setResendTimer() {
    this.reSendTimer = 60;

    var timer = setInterval(() => {
      this.resentBtnText = 'Re Send In (' + this.reSendTimer + ') sec';
      this.reSendTimer = this.reSendTimer - 1;
      if (this.reSendTimer == 0) {
        clearInterval(timer);
        this.resentBtnText = 'Re Send';
      }
    }, 1000);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      message:
        `Please fill the phone verification PIN that has been sent to your number\n\nEnter the OTP\n`,
      inputs: [
        {
          name: 'inputField',
          type: 'text',
          placeholder: 'Input Field'
        },
      ],
      buttons: [
        {
          text: 'Verify',
          handler: (data) => {
            this.userOtp = data.inputField;
            this.loginwithotp();
          },
        },
      ],
    });

    await alert.present();
  }

  loginwithotp() {
    // check otp and token is not null
    if (this.otpToken == '' && this.userOtp == '') {
      const toast = this.toastController.create({
        message: 'Enter Valid Otp',
        duration: 2000,
        color: 'danger',
        position: 'bottom',
      });

      toast.then((toast) => {
        toast.present();
      });
      return;
    }
    this.loginService
      .verifyLoginOtpRequest(this.otpToken, this.userOtp)
      .then((res: any) => {
        this.loginService.setSessionToken(res.token);
        this.loginService.setUserData(JSON.stringify(res.user));
        // refirect to home page
        this.router.navigate(['/home']);
        const toast = this.toastController.create({
          message: 'Login sucessfully',
          duration: 2000,
          color: 'success',
          position: 'bottom',
        });

        toast.then((toast) => {
          toast.present();
        });

        setTimeout(() => {
          this.showOtpBox = false;
          this.otpToken = '';
          this.userOtp = '';
          this.userMobileNumber = '';
          this.userCountryCode = '';
        }, 2000);
      })
      .catch((err: any) => {
        const toast = this.toastController.create({
          message: err.error.message,
          duration: 2000,
          color: 'danger',
          position: 'bottom',
        });

        toast.then((toast) => {
          toast.present();
        });
      });
  }
}
