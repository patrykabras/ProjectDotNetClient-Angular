import { Component, OnInit } from '@angular/core';
import { HeroDetailService } from '../shared/hero-detail.service';
import { HeroDetail } from '../shared/hero-detail.model';
import { UnitTypeDetailService } from '../shared/unit-type-detail.service';
import { UnitTypeDetail } from '../shared/unit-type-detail.model';

import { FormControl, NgForm } from '@angular/forms';
import { UnitDetailService } from '../shared/unit-detail.service';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit {
  name = new FormControl('');
  public loading: boolean = false;
  public isHeroSelected: boolean = false;
  public isUnitTypeSelected: boolean = false;
  public singleHero: HeroDetail;
  public singleUnitType: UnitTypeDetail;



  constructor(public service: HeroDetailService, public service2: UnitTypeDetailService, private serviceUnit: UnitDetailService) { }

  ngOnInit(): void {
    this.loading = true;
    this.service.getAllHero().then(_ => {
      this.loading = false;
      if (this.service.heroList.length != 0) {
        this.singleHero = this.service.heroList[0];
        this.isHeroSelected = true;
      } else {
        this.isHeroSelected = false;
      }
    });
    this.service2.getAllUnitTypes().then(_ => {
      this.loading = false;
      if (this.service2.unitTypeList.length != 0) {
        this.singleUnitType = this.service2.unitTypeList[0];
        this.isUnitTypeSelected = true;
      }
    });
  }
  deleteHero() {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteHero(this.singleHero.heroId)
        .subscribe(res => {
          this.service.getAllHero().then(_ => {
            this.loading = false;
            if (this.service.heroList.length != 0) {
              this.singleHero = this.service.heroList[0];
              this.isHeroSelected = true;
            } else {
              this.isHeroSelected = false;
            }
          });;
        },
          err => {
            console.log(err);
          })
    }
  }
  addNewHero(f: NgForm) {
    var hero: HeroDetail = new HeroDetail();
    hero.heroId = 0;
    hero.name = f.value.newHeroName;
    hero.race = f.value.newHeroRace;
    hero.hp = f.value.newHeroHp;
    hero.mana = f.value.newHeroMana;
    hero.dmg = f.value.newHeroDmg;
    this.service.postHero(hero).subscribe(
      res => {
        confirm(`Hero with name ${hero.name} added to list`)
        var heroRes = res as HeroDetail;
        this.service.getAllHero().then(_ => {
          this.loading = false;
          if (this.service.heroList.length != 0) {
            this.singleHero = this.service.heroList.find(h => h.heroId == heroRes.heroId);
            this.isHeroSelected = true;
          } else {
            this.isHeroSelected = false;
          }
        });;
      },
      err => {
        console.log(err);
      }
    )
  }

  addUnitToHero(unitType: NgForm) {
    this.service.putUnitToHero(this.singleHero.heroId, this.singleUnitType.id, unitType.value.sizeAddUnit).subscribe(
      res => {
        this.service.getAllHero().then(_ => {
          this.singleHero = this.service.heroList.find(h => h.heroId == this.singleHero.heroId);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  onChange(heroID) {
    this.singleHero = this.service.heroList.find(h => h.heroId == heroID);
  }
  onChangeAddUnit(unitTypeID) {
    this.singleUnitType = this.service2.unitTypeList.find(ut => ut.id == unitTypeID);
  }
  deleteUnitFromHero(unitId){
    this.serviceUnit.deleteUnit(unitId).subscribe(
      res => {
        this.service.getAllHero().then(_ => {
          this.singleHero = this.service.heroList.find(h => h.heroId == this.singleHero.heroId);
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  sizeChange(inputValue, unitId) {
    var sizeNow = this.singleHero.units.find(u => u.id == unitId).size;
    if (inputValue > sizeNow) {
      this.serviceUnit.unitSizeUp(this.singleHero.heroId, unitId, (inputValue - sizeNow)).subscribe(
        res => {
          this.service.getAllHero().then(_ => {
            this.singleHero = this.service.heroList.find(h => h.heroId == this.singleHero.heroId);
          });
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.serviceUnit.unitSizeDown(this.singleHero.heroId, unitId, (sizeNow - inputValue)).subscribe(
        res => {
          this.service.getAllHero().then(_ => {
            this.singleHero = this.service.heroList.find(h => h.heroId == this.singleHero.heroId);
          });
        },
        err => {
          console.log(err);
        }
      );
    }

  }

}
