import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentbyAdminComponent } from './paymentby-admin.component';

describe('PaymentbyAdminComponent', () => {
  let component: PaymentbyAdminComponent;
  let fixture: ComponentFixture<PaymentbyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentbyAdminComponent]
    });
    fixture = TestBed.createComponent(PaymentbyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
