import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterLabelComponent } from './center-label.component';

describe('CenterLabelComponent', () => {
  let component: CenterLabelComponent;
  let fixture: ComponentFixture<CenterLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
