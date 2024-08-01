import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherratingAdminComponent } from './teacherrating-admin.component';

describe('TeacherratingAdminComponent', () => {
  let component: TeacherratingAdminComponent;
  let fixture: ComponentFixture<TeacherratingAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherratingAdminComponent]
    });
    fixture = TestBed.createComponent(TeacherratingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
