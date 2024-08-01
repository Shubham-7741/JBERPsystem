import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GethomeworkBystudentComponent } from './gethomework-bystudent.component';

describe('GethomeworkBystudentComponent', () => {
  let component: GethomeworkBystudentComponent;
  let fixture: ComponentFixture<GethomeworkBystudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GethomeworkBystudentComponent]
    });
    fixture = TestBed.createComponent(GethomeworkBystudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
