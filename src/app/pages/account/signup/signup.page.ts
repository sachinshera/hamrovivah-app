import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('modal', { static: true }) modal!: IonModal;

  selectedFruitsText = 'Select Country';
  selectedFruits: any[] = [];

  countries: any[] = [
    { text: 'INDIA', value: 'INDIA' },
    {
      text: 'USA',
      value: 'USA'
    },
    {
      text: 'NEPAL',
      value: 'NEPAL'
    }
  ];

  private formatData(data: string[]) {
    if (data.length === 1) {
      const country = this.countries.find((country) => country.value === data[0]);
      return country.text;
    }

    return `${data.length}`;
  }

  countrySelectionChange(countries: string[]) {
    this.selectedFruits = countries;
    this.selectedFruitsText = this.formatData(this.selectedFruits);
    this.modal.dismiss();
  }

}
