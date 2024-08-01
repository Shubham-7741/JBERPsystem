import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineventComponent } from './adminevent.component';

describe('AdmineventComponent', () => {
  let component: AdmineventComponent;
  let fixture: ComponentFixture<AdmineventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmineventComponent]
    });
    fixture = TestBed.createComponent(AdmineventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
