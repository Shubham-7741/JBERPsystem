import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditteacherdeatilsComponent } from './editteacherdeatils.component';

describe('EditteacherdeatilsComponent', () => {
  let component: EditteacherdeatilsComponent;
  let fixture: ComponentFixture<EditteacherdeatilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditteacherdeatilsComponent]
    });
    fixture = TestBed.createComponent(EditteacherdeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
