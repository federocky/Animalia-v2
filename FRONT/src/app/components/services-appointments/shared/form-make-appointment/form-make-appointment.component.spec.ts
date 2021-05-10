import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMakeAppointmentComponent } from './form-make-appointment.component';

describe('FormMakeAppointmentComponent', () => {
  let component: FormMakeAppointmentComponent;
  let fixture: ComponentFixture<FormMakeAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMakeAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMakeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
