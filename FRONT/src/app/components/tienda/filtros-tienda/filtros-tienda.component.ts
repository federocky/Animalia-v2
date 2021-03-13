import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtros-tienda',
  templateUrl: './filtros-tienda.component.html',
  styleUrls: ['./filtros-tienda.component.scss']
})
export class FiltrosTiendaComponent implements OnInit {
  @Output() changeSelectedQty: EventEmitter<string> = new EventEmitter();
 
  qty:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ChangeQty(): void {
    this.changeSelectedQty.emit(this.qty);

    console.log(this.qty);
  }

}
