import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCardTiendaComponent } from './articulo-card-tienda.component';

describe('ArticuloCardTiendaComponent', () => {
  let component: ArticuloCardTiendaComponent;
  let fixture: ComponentFixture<ArticuloCardTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticuloCardTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCardTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
