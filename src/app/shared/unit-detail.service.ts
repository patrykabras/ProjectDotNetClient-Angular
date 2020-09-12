import { Injectable } from '@angular/core';
import { UnitDetail } from './unit-detail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitDetailService {

  unitData: UnitDetail;
  unitList: UnitDetail[];
  readonly rootUrl = "https://localhost:5001/api";
  constructor(private http: HttpClient) { }

  unitSizeUp(heroId, unitId, unitSize) {
    return this.http.put(this.rootUrl + `/Unit/IncreasedUnitSize/heroId=${heroId}&unitId=${unitId}&unitSize=${unitSize}`, undefined);
  }
  unitSizeDown(heroId, unitId, unitSize) {
    return this.http.put(this.rootUrl + `/Unit/DecreasedUnitSize/heroId=${heroId}&unitId=${unitId}&unitSize=${unitSize}`, undefined);
  }
  deleteUnit(unitId) {
    return this.http.delete(this.rootUrl + `/Unit/${unitId}`, undefined);
  }
  
}
