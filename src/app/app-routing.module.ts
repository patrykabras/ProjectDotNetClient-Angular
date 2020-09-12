import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroBattleComponent } from './hero-battle/hero-battle.component';
import { HeroPageComponent } from './hero-page/hero-page.component';


const routes: Routes = [
  { path: '',   redirectTo: '/hero-page', pathMatch: 'full' },
  { path: 'hero-battle', component: HeroBattleComponent},
  { path: 'hero-page', component: HeroPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
