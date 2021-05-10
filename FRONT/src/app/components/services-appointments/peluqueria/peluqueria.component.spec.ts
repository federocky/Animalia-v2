import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeluqueriaComponent } from './peluqueria.component';

describe('PeluqueriaComponent', () => {
  let component: PeluqueriaComponent;
  let fixture: ComponentFixture<PeluqueriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeluqueriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeluqueriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
