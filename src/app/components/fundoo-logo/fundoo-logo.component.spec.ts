import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundooLogoComponent } from './fundoo-logo.component';

describe('FundooLogoComponent', () => {
  let component: FundooLogoComponent;
  let fixture: ComponentFixture<FundooLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundooLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundooLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
