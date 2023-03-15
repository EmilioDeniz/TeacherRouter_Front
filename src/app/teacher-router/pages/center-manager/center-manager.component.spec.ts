import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterManagerComponent } from './center-manager.component';

describe('CenterManagerComponent', () => {
  let component: CenterManagerComponent;
  let fixture: ComponentFixture<CenterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
