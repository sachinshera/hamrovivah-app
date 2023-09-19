import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor() {

  }

  public api = "http://localhost:3000";

  // get all form categiory
  getFormCategory() {
    return new Promise((resolve, reject) => {
      fetch(this.api + '/formcategory/order')
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  // get form category by id

  getFormCategoryById(id: string) {
    return new Promise((resolve, reject) => {
      fetch(this.api + '/formcategory/' + id)
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };
}
