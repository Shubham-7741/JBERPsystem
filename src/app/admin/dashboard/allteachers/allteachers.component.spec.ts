import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllteachersComponent } from './allteachers.component';

describe('AllteachersComponent', () => {
  let component: AllteachersComponent;
  let fixture: ComponentFixture<AllteachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllteachersComponent]
    });
    fixture = TestBed.createComponent(AllteachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
