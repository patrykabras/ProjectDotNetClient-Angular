import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BattleLog } from './battle-log.model';

@Injectable({
  providedIn: 'root'
})
export class BattleLogService {

  battleLog:BattleLog;
  battleLogList:BattleLog[];
  readonly rootUrl = "https://localhost:5001/api";
  constructor(private http:HttpClient) { }

  startBattle(heroId1: number, heroId2:number){
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.rootUrl + `/HeroBattle/${heroId1}&${heroId2}`)
        .toPromise()
        .then(
          res => { // Success
            this.battleLogList = res as BattleLog[];
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
