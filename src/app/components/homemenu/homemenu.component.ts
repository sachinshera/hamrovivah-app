import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-homemenu',
  templateUrl: './homemenu.component.html',
  styleUrls: ['./homemenu.component.scss'],
})
export class HomemenuComponent implements OnInit {
  public name: string = "";
  public mobile: string = "";
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.getUserData().then((userdata) => {
      userdata = JSON.parse(userdata);
      this.name = userdata.name;
      this.mobile = userdata.mobile;
    }).catch((err) => { });
  };

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);

  }

}
