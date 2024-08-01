import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatehomeworkAdminComponent } from './createhomework-admin.component';

describe('CreatehomeworkAdminComponent', () => {
  let component: CreatehomeworkAdminComponent;
  let fixture: ComponentFixture<CreatehomeworkAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatehomeworkAdminComponent]
    });
    fixture = TestBed.createComponent(CreatehomeworkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
