import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgenofStudentComponent } from './reportgenof-student.component';

describe('ReportgenofStudentComponent', () => {
  let component: ReportgenofStudentComponent;
  let fixture: ComponentFixture<ReportgenofStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportgenofStudentComponent]
    });
    fixture = TestBed.createComponent(ReportgenofStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
