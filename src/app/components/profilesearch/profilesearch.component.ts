import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilesearch',
  templateUrl: './profilesearch.component.html',
  styleUrls: ['./profilesearch.component.scss'],
})
export class ProfilesearchComponent implements OnInit {
  public searchText = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  searchProfiles() {
    console.log(this.searchText);
    this.router.navigateByUrl('/search/' + this.searchText);
  }

}
