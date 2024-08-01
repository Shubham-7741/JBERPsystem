import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaverequestTeacherComponent } from './leaverequest-teacher.component';

describe('LeaverequestTeacherComponent', () => {
  let component: LeaverequestTeacherComponent;
  let fixture: ComponentFixture<LeaverequestTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaverequestTeacherComponent]
    });
    fixture = TestBed.createComponent(LeaverequestTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
