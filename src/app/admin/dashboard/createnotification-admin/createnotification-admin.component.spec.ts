import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenotificationAdminComponent } from './createnotification-admin.component';

describe('CreatenotificationAdminComponent', () => {
  let component: CreatenotificationAdminComponent;
  let fixture: ComponentFixture<CreatenotificationAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatenotificationAdminComponent]
    });
    fixture = TestBed.createComponent(CreatenotificationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
