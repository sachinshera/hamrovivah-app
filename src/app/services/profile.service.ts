import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private LoginService: LoginService) {

  }

  public api = environment.api;
  // get all profiles

  getProfiles(page: number) {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/profile?page' + page, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // get profile by id

  getProfileById(id: string) {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/profile/' + id, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // search profile by name

  searchProfileBytext(text: string, page: number) {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + `/profile/search?search=${text}&page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // get all form categiory
  getFormCategory() {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/formcategory/orders', {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // get form category by id

  getFormCategoryById(id: string) {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/formcategory/' + id, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };;


  // update values

  updateValues(values: any[]) {
    return new Promise(async (resolve, reject) => {
      // check each value has inputId and  inputValue
      // values.forEach((value) => {
      //   if (value.inputId == undefined || value.inputValue == undefined) {
      //     reject("inputId or inputValue is undefined");
      //   }
      // });

      let token = await this.LoginService.getToken();
      var form = new FormData();
      form.append(
        'inputs',
        new Blob([JSON.stringify(values)])
      );

      var fetchOptions: any = {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "inputs": values
        })
      };

      fetch(this.api + '/profile/bulks', fetchOptions).then(res => res.json()).then(data => {
        resolve(data);
      }).catch(err => reject(err));

    });
  };

  // get profile by prefrences

  getPfofilesByPrefrences(page: number) {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/profile/prefrences?page=' + page, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // create order

  createOrder() {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/userplans/pay/100', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // like a user

  likeUser(id: string) {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/likes/' + id, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // get my likes

  getMyLikes() {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/likes', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // get who liked me

  getWhoLikedMe() {
    return new Promise(async (resolve, reject) => {
      let token = await this.LoginService.getToken();
      fetch(this.api + '/likes/whomLikedMe', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };
}
