import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-tienda',
  templateUrl: './main-tienda.component.html',
  styleUrls: ['./main-tienda.component.scss']
})
export class MainTiendaComponent implements OnInit {

  //cantidad de articulos en el filtro select
  qtyProducts: string = '12';

  order: string = 'ordenar';

  constructor() { }

  ngOnInit(): void {
  }

}
