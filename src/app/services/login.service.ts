import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) {
  }

  // verify session token

  verifySessionToken(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.storageService.get("session").then((token) => {
        console.log(token)
        // check if token is not null or undefined
        if (token != null || token != undefined) {
          // veryfy token from server side in header Authorization
          this.http.get(environment.api + "/login/session", {
            headers: {
              "Authorization": token,
            }
          }).subscribe((res: any) => {
            resolve(res);
          }, err => {
            reject(err);
          });
        } else {
          reject("token is null or undefined");
        }
      }).catch((err) => {
        reject(err);
      });

    });
  };

  // initate login otp request

  initiateLoginOtpRequest(phoneNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + "/login/mobile", {
        phoneNumber: phoneNumber
      }).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  };

  // verify login otp request

  verifyLoginOtpRequest(token: string, otp: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + "/login/mobile/verify", {
        token: token,
        otp: otp
      }).subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  };

  // set session token

  setSessionToken(token: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.storageService.set("session", token);
      resolve();
    });
  };;


  // get user counrty by ip

  getUserCountryByIp(): Promise<any> {
    // https://ipleak.net/json/

    return new Promise((resolve, reject) => {
      this.http.get("https://ipapi.co/json/").subscribe((res: any) => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  };

  // set user data

  setUserData(userData: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.storageService.set("user", userData);
      resolve();
    });
  };

  // get user data

  getUserData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const userData: any = await this.storageService.get("user");
      resolve(userData);
    });
  };

  // update user data in server and local storage

  updateUserData(userData: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let session = await this.storageService.get("session");
      if (session == null || session == undefined) reject("session is null or undefined");
      this.http.put(environment.api + "/users", userData, {
        headers: {
          "Authorization": session
        }
      }).subscribe((res: any) => {
        this.storageService.set("user", JSON.stringify(res));
        resolve();
      }, err => {
        reject(err);
      });
    });
  };

  // logout

  logout(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let token = await this.storageService.get("session");
      await this.storageService.remove("session");
      await this.storageService.remove("user");
      this.http.get(environment.api + "/login/logout", {
        headers: {
          "Authorization": token
        }
      }).subscribe((res: any) => {
        resolve();
      }, err => {
        reject(err);
      });
    });
  };

  // get token

  getToken(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let token = await this.storageService.get("session");
      resolve(token);
    });
  }
}
