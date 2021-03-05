import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosTiendaComponent } from './articulos-tienda.component';

describe('ArticulosTiendaComponent', () => {
  let component: ArticulosTiendaComponent;
  let fixture: ComponentFixture<ArticulosTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
