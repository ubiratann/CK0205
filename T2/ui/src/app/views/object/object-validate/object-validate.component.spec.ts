import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectValidateComponent } from './object-validate.component';

describe('ObjectValidateComponent', () => {
  let component: ObjectValidateComponent;
  let fixture: ComponentFixture<ObjectValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
