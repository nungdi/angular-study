import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHeroComponent } from './manage-hero.component';

describe('ManageHeroComponent', () => {
  let component: ManageHeroComponent;
  let fixture: ComponentFixture<ManageHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
