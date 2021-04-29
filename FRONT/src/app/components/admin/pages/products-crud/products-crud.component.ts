import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {

  products: Product[] = [];
  

  constructor( private _productService: ProductService) { }

  ngOnInit(): void {

    this.showLoading();
    this.loadProducts();

  }

  loadProducts(){
    this._productService.getProducts()
      .subscribe( (res: any) => {

        this.products = res.data;
        Swal.close();

      }, err => {
        console.log(err);

        Swal.fire({
          allowOutsideClick: true,
          title: 'Oops...',
          icon: 'warning',
          text: 'Error en la conexión'
        });
      })
  }
  
  delete( id: number){
    this._productService.deleteProduct( id )
      .subscribe( (res:any) => {
        this.loadProducts();
      }, err => {
        this.showError();
      })
  }

  activate( id: number) {
    this._productService.recoverProduct( id )
      .subscribe( (res: any) => {
        this.loadProducts();
      }, err => {
        console.log(err);
        this.showError();
      })
  }



  showLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
  }

  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha ido mal, intentelo mas tarde'
    });
  }

}
