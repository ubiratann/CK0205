import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectUpdateComponent } from './object-update.component';

describe('ObjectUpdateComponent', () => {
  let component: ObjectUpdateComponent;
  let fixture: ComponentFixture<ObjectUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
