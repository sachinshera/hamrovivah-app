import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor() {

  }

  // get all form categiory
  getFormCategory() {
    return new Promise((resolve, reject) => {
      fetch(environment.api + '/formcategory')
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
      fetch(environment.api + '/formcategory/' + id)
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };
}
