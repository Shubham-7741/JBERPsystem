import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesAdminComponent } from './courses-admin.component';

describe('CoursesAdminComponent', () => {
  let component: CoursesAdminComponent;
  let fixture: ComponentFixture<CoursesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesAdminComponent]
    });
    fixture = TestBed.createComponent(CoursesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
