import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-partner',
  templateUrl: './search-partner.page.html',
  styleUrls: ['./search-partner.page.scss'],
})
export class SearchPartnerPage implements OnInit {
  age: { lower: number, upper: number } = { lower: 18, upper: 99 };
  height: { lower: number, upper: number } = { lower: 3, upper: 8 };
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  pinFormatter1(value: number) {
    return `${value}Yrs`;
  }
  pinFormatter2(height: number) {
    const feet = Math.floor(height);
    const inches = Math.round((height - feet) * 12);
    let ht = `${feet}ft`;
    if(inches !== 0){
      ht = `${feet}'${inches}ft`
    }
    return ht;
  }
}
