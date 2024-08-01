import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserFormComponent } from './edituser-form.component';

describe('EdituserFormComponent', () => {
  let component: EdituserFormComponent;
  let fixture: ComponentFixture<EdituserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdituserFormComponent]
    });
    fixture = TestBed.createComponent(EdituserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
