import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBattleComponent } from './hero-battle.component';

describe('HeroBattleComponent', () => {
  let component: HeroBattleComponent;
  let fixture: ComponentFixture<HeroBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
