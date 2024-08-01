import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachertaskComponent } from './teachertask.component';

describe('TeachertaskComponent', () => {
  let component: TeachertaskComponent;
  let fixture: ComponentFixture<TeachertaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachertaskComponent]
    });
    fixture = TestBed.createComponent(TeachertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
