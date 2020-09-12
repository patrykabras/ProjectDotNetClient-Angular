import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroDetail } from './hero-detail.model';


@Injectable({
  providedIn: 'root'
})
export class HeroDetailService {

  heroData:HeroDetail;
  heroList:HeroDetail[];
  readonly rootUrl = "https://localhost:5001/api";
  constructor(private http:HttpClient) { }

  deleteHero(heroId){
    return this.http.delete(this.rootUrl + '/Hero/' + heroId);
  }
  postHero(hero: HeroDetail) {
    return this.http.post(this.rootUrl + '/Hero', hero);
  }
  putUnitToHero(heroId, unitTypeId, size){
    return this.http.put(this.rootUrl + `/UnitToHero/AddUnitToHero/${heroId}&${unitTypeId}&${size}`, undefined)
  }
  getAllHero(){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.rootUrl + '/Hero')
        .toPromise()
        .then(
          res => { // Success
            this.heroList = res as HeroDetail[];
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
