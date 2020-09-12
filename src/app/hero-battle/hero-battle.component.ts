import { Component, OnInit } from '@angular/core';
import { BattleLogService } from '../shared/battle-log.service';
import { HeroDetailService } from '../shared/hero-detail.service';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, NgForm } from '@angular/forms';
import { BattleLog } from '../shared/battle-log.model';

@Component({
  selector: 'app-hero-battle',
  templateUrl: './hero-battle.component.html',
  styleUrls: ['./hero-battle.component.scss']
})
export class HeroBattleComponent implements OnInit {
  public isBattleLogActive = false;
  public heroLisLoaded = false;
  public singleBattleLog: BattleLog;
  public currentRound: number;

  constructor(public serviceBattleLog: BattleLogService, public serviceHeroDetail: HeroDetailService) { }

  ngOnInit(): void {
    this.serviceHeroDetail.getAllHero().then(_ => {
      this.heroLisLoaded = true;
    });

  }

  startBattle(f: NgForm) {
    this.serviceBattleLog.startBattle(f.value.hero1, f.value.hero2).then(_ => {
      this.isBattleLogActive = true;
      if (this.serviceBattleLog.battleLogList.length != 0) {
        this.singleBattleLog = this.serviceBattleLog.battleLogList[0];
        this.currentRound = 0;
      }
    });
  }
  nextRound(){
    if(this.serviceBattleLog.battleLogList.length > this.currentRound + 1){
      this.currentRound++;
      this.singleBattleLog = this.serviceBattleLog.battleLogList[this.currentRound];
    }
  }
  previousRound(){
    if(0 <= this.currentRound - 1){
      this.currentRound--;
      this.singleBattleLog = this.serviceBattleLog.battleLogList[this.currentRound];
    }
  }
  changeRound(inputValue: number) {
    var roundNow: number = inputValue;
    this.singleBattleLog = this.serviceBattleLog.battleLogList[roundNow - 1];
    this.currentRound = roundNow - 1;
  }
}
