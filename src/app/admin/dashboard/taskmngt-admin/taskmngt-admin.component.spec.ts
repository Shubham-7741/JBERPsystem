import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmngtAdminComponent } from './taskmngt-admin.component';

describe('TaskmngtAdminComponent', () => {
  let component: TaskmngtAdminComponent;
  let fixture: ComponentFixture<TaskmngtAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskmngtAdminComponent]
    });
    fixture = TestBed.createComponent(TaskmngtAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
