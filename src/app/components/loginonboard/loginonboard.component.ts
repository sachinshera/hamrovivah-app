import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-loginonboard',
  templateUrl: './loginonboard.component.html',
  styleUrls: ['./loginonboard.component.scss'],
})
export class LoginonboardComponent implements OnInit {
  public username: string = "";
  constructor(
    private loginService: LoginService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() { }

  updateName() {
    // check if username is not empty
    if (this.username == "") {
      let toast = this.toastController.create({
        message: "Name cannot be empty",
        duration: 2000,
        color: "danger",
        position: "top"
      });

      toast.then(toast => {
        toast.present();
      });
    };

    // update username

    this.loginService.updateUserData({
      name: this.username
    }).then(res => {
      let toast = this.toastController.create({
        message: "Name updated successfully",
        duration: 2000,
        color: "success",
        position: "top"
      });

      toast.then(toast => {
        toast.present();
      });

      this.router.navigateByUrl("/");
    }).catch(err => {

      let toast = this.toastController.create({
        message: err,
        duration: 2000,
        color: "danger",
        position: "top"
      });

      toast.then(toast => {
        toast.present();
      });

      if (err == "session is null or undefined") {
        this.router.navigateByUrl("/login");
      }
    });
  }

}
