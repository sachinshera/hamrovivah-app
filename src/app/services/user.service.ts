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
  };

  // get users photos

  getUsersPhotos(page: number) {
    return new Promise(async (resolve, reject) => {
      var session = await this.storageService.get("session");
      this.http.get(environment.api + "/users/files/images/" + page, {
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

  // delete photo

  deletePhoto(id: any) {
    return new Promise(async (resolve, reject) => {
      var session = await this.storageService.get("session");
      this.http.delete(environment.api + "/users/files/" + id, {
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

  // upload file

  uploadFile(formData: any) {
    return new Promise(async (resolve, reject) => {
      var session = await this.storageService.get("session");
      this.http.post(environment.api + "/users/files", formData, {
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

  // download file


  downloadFile(url: string) {
    return new Promise(async (resolve, reject) => {
      var session = await this.storageService.get("session");
      this.http.get(url)
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  };
}
