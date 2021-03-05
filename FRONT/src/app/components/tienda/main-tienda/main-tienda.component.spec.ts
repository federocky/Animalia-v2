import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTiendaComponent } from './main-tienda.component';

describe('MainTiendaComponent', () => {
  let component: MainTiendaComponent;
  let fixture: ComponentFixture<MainTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
