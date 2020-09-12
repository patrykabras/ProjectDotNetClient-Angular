import { UnitDetail } from './unit-detail.model';

export class HeroDetail {
    heroId:number;
    name:string;
    race:string;
    hp:number;
    dmg:number;
    mana:number;
    units:UnitDetail[];
}
