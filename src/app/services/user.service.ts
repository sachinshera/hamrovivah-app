import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private storageService: StorageService
  ) { }

  // get user details

  getUserDetails() {
    return new Promise(async (resolve, reject) => {
      var session = await this.storageService.get("session");
      this.http.get(environment.api + "/users", {
        headers: {
          "Authorization": session
        }
      })
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  };

  // upload profile pic

  uploadProfilePic(formData: any) {
    return new Promise(async (resolve, reject) => {
      var session = await this.storageService.get("session");
      this.http.post(environment.api + "/users/profilepic", formData, {
        headers: {
          "Authorization": session
        }
      })
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }
}
