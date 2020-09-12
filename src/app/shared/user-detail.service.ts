import { UserDetail } from './user-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  formData:UserDetail;
  list:UserDetail[]; 
  readonly rootURL = "https://localhost:5000/api"
  constructor(private http:HttpClient) { }
  

  postUser() {
    return this.http.post(this.rootURL + '/Test', this.formData);
  }
  putUser() {
    return this.http.put(this.rootURL + '/Test'+ this.formData.UserID, this.formData);
  }
  deleteUser(id) {
    return this.http.delete(this.rootURL + '/Test'+ id);
  }


  refreshList(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.rootURL + '/Test')
        .toPromise()
        .then(
          res => { // Success
            this.list = res as UserDetail[];
            resolve();
          },
          msg => {
            reject(msg);
          }
        );
    });
    return promise;
  }
}
