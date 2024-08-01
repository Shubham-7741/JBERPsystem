import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingleavesAdminComponent } from './pendingleaves-admin.component';

describe('PendingleavesAdminComponent', () => {
  let component: PendingleavesAdminComponent;
  let fixture: ComponentFixture<PendingleavesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingleavesAdminComponent]
    });
    fixture = TestBed.createComponent(PendingleavesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
