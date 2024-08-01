import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountinfoComponent } from './acountinfo.component';

describe('AcountinfoComponent', () => {
  let component: AcountinfoComponent;
  let fixture: ComponentFixture<AcountinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcountinfoComponent]
    });
    fixture = TestBed.createComponent(AcountinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
