import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  callus() {
    // make a call 
    // dial  +918210071758 in default phone dialer
    window.open(`tel:+918210071758`, '_system');
  }

}
