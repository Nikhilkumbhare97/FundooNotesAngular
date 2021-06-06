import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetArchiveNotesComponent } from './get-archive-notes.component';

describe('GetArchiveNotesComponent', () => {
  let component: GetArchiveNotesComponent;
  let fixture: ComponentFixture<GetArchiveNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetArchiveNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetArchiveNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
