import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTrashNotesComponent } from './get-trash-notes.component';

describe('GetTrashNotesComponent', () => {
  let component: GetTrashNotesComponent;
  let fixture: ComponentFixture<GetTrashNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTrashNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTrashNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
