import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasarelaAppointmentsComponent } from './pasarela-appointments.component';

describe('PasarelaAppointmentsComponent', () => {
  let component: PasarelaAppointmentsComponent;
  let fixture: ComponentFixture<PasarelaAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasarelaAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasarelaAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
