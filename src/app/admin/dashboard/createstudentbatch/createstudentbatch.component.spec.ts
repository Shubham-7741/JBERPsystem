import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatestudentbatchComponent } from './createstudentbatch.component';

describe('CreatestudentbatchComponent', () => {
  let component: CreatestudentbatchComponent;
  let fixture: ComponentFixture<CreatestudentbatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatestudentbatchComponent]
    });
    fixture = TestBed.createComponent(CreatestudentbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
