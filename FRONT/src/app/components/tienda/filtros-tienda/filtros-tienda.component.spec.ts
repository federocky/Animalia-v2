import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosTiendaComponent } from './filtros-tienda.component';

describe('FiltrosTiendaComponent', () => {
  let component: FiltrosTiendaComponent;
  let fixture: ComponentFixture<FiltrosTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
