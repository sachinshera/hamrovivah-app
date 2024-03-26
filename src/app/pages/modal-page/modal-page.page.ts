import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { CountryCodeModel, countries } from 'src/app/data-models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  site: any;
  public countryList: ReplaySubject<CountryCodeModel[]> = new ReplaySubject<
    CountryCodeModel[]
  >(1); //store filtered country coe while searching
  countryListCopy: CountryCodeModel[] = []; // list of country copy
  public searchFilterCtrl: FormControl = new FormControl(); // search filter form controller
  protected _onDestroy = new Subject<void>(); //Subject that emits when the component has been destroyed.
  otpForm!: FormGroup;
  showThumb = false;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private loginService: LoginService
  ) {}
  ionViewWillEnter() {
    console.log('this.site', this.site);

    if (!!this.site) {
      if (this.site.name === 'enterOtp') {
        this.otpForm = this.formBuilder.group({
          otp: ['', Validators.required],
        });
      }
      if (this.site.name === 'countryCode') {
        this.countryListCopy = countries; // get country list copy
        this.countryList.next(this.countryListCopy); // add list to the select option
        this.searchFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filerList();
          });
      }
    }
  }
  // Function to get the phone control from the form
  get otp() {
    return this.otpForm.get('otp');
  }
  protected filerList() {
    // get the search keyword
    let search: string = this.searchFilterCtrl.value;

    if (search) {
      // if search is not null the filter the list according to the search value
      let searchValue: string = search.toLocaleLowerCase();
      let list = this.countryListCopy.filter(
        (item) =>
          item.text.toLocaleLowerCase().includes(searchValue) ||
          item.value.toLocaleLowerCase().includes(searchValue) ||
          item.code.toLocaleLowerCase().includes(searchValue)
      );
      this.countryList.next(list); //add filter list to the select option
    } else {
      this.countryList.next(this.countryListCopy); // if no searchvalue the show all the list in select option
    }
  }
  ngOnInit(): void {}
  // pass the selected country code
  onSelect(data: any) {
    if (this.site.name === 'countryCode') {
      this.modalCtrl.dismiss(data);
    }
    if (this.site.name === 'enterOtp') {
      console.log('data', data, 'data.otp', data.otp);
      // check otp and token is not null
      if (this.site.otpToken == '' && data.otp == '') {
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
        .verifyLoginOtpRequest(this.site.otpToken, data.otp)
        .then((res: any) => {
          console.log('res', res)
          const response = {
            otp: data.otp,
            token: res.token,
            user: res.user,
          };
          this.showThumb = true;
          setTimeout(()=>{
            this.modalCtrl.dismiss(response);
          }, 1000)
        })
        .catch((err: any) => {
          console.log('err', err)
          const toast = this.toastController.create({
            message: err.error.message,
            duration: 2000,
            color: 'danger',
            position: 'bottom',
          });

          toast.then((toast) => {
            toast.present();
          });
          this.modalCtrl.dismiss();
        });
    }
  }
  // close modal
  close() {
    this.modalCtrl.dismiss();
  }
}
