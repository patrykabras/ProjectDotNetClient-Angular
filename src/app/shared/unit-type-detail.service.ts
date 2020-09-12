import { Injectable } from '@angular/core';
import { UnitTypeDetail } from './unit-type-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitTypeDetailService {

  unitType:UnitTypeDetail;
  unitTypeList:UnitTypeDetail[];
  readonly rootUrl = "https://localhost:5001/api";
  constructor(private http:HttpClient) { }

  getAllUnitTypes(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.rootUrl + '/MockUnitType')
        .toPromise()
        .then(
          res => { // Success
            this.unitTypeList = res as UnitTypeDetail[];
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
