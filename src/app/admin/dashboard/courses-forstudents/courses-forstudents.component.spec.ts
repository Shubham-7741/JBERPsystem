import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesForstudentsComponent } from './courses-forstudents.component';

describe('CoursesForstudentsComponent', () => {
  let component: CoursesForstudentsComponent;
  let fixture: ComponentFixture<CoursesForstudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesForstudentsComponent]
    });
    fixture = TestBed.createComponent(CoursesForstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
