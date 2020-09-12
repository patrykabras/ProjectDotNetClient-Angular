import { HeroDetail } from './hero-detail.model';

export class BattleLog {
    id:number;
    name:string;
    description:string;
    heroStats:HeroDetail[];

    constructor(id:number, name:string, description:string, heroStats:HeroDetail[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.heroStats = heroStats;
    }
}