import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {

  products: Product[] = [];
  

  constructor( private _productService: ProductService) { }

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(){
    this._productService.getProducts()
      .subscribe( (res: any) => {
        console.log(res);
        this.products = res.data;
      }, err => {
        console.log(err);
      })
  }

}
