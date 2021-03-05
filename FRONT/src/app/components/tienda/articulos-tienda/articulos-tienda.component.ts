import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-articulos-tienda',
  templateUrl: './articulos-tienda.component.html',
  styleUrls: ['./articulos-tienda.component.scss']
})
export class ArticulosTiendaComponent implements OnInit {

  productos;



  constructor( private productoService: ProductoService) { }

  ngOnInit(): void {

    this.productoService.getProductos()
      .subscribe( (res:any) => {
        this.productos = res;
        console.log(res);
      })
  }

  
}
