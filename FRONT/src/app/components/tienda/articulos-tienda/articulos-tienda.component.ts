import { Variables } from './../../../common/utils';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-articulos-tienda',
  templateUrl: './articulos-tienda.component.html',
  styleUrls: ['./articulos-tienda.component.scss']
})
export class ArticulosTiendaComponent implements OnInit {

  products: Product [] = [];

  //ruta de las imagenes correspodientes a los productos
  imgRoute: string = Variables.imgRouteProducts;

  ///nos permite implementar el pintado de estrellas
  cantidadEstrellas = [1, 2, 3, 4, 5];





  constructor( private productService: ProductService ) { }

  ngOnInit(): void {

    //cargar los productos
    this.getProducts();

  }

  //recibe todos los productos
  getProducts(){
    this.productService.getProducts()
      .subscribe( (res:any) => {
        this.products = res.data;
        console.log(this.products);
      });
  }

  
}
