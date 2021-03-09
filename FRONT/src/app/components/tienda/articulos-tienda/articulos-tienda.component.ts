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
  imgRoute: string = Variables.imgRoute;



  constructor( private productService: ProductService ) { }

  ngOnInit(): void {

    this.productService.getProducts()
      .subscribe( (res:any) => {
        this.products = res.data;
        console.log(this.products);
      });
  }

  
}
