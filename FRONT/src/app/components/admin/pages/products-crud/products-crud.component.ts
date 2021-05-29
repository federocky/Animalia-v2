import { SwalService } from './../../../../services/swal.service';
import { Product } from './../../../../models/product';
import { ProductService } from './../../../../services/product.service';
import { Component, OnInit } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-crud',
  templateUrl: './products-crud.component.html',
  styleUrls: ['./products-crud.component.scss']
})
export class ProductsCrudComponent implements OnInit {

  products: Product[] = [];
  openForm = false;
  product: Product;
  term: string;
  order:string;


  constructor( private _productService: ProductService,
               private _swalService: SwalService) { }

  ngOnInit(): void {

    this._swalService.showLoading();
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
        this._swalService.showError();
      })
  }

  activate( id: number) {
    this._productService.recoverProduct( id )
      .subscribe( (res: any) => {
        this.loadProducts();
      }, err => {
        console.log(err);
        this._swalService.showError();
      })
  }

  showForm( product: Product ) {
    this.product = product;
    this.openForm = true;
  }

  productRecived( product: Product ){

    this.openForm = false;
    this._swalService.showLoading();

    if(product.id) this.updateProduct(product);
    else this.saveNewProduct(product);
  }

  openNewForm(){
    this.product = null;
    this.openForm = true;
  }

  updateProduct(product: Product){
    this._productService.updateProduct( product )
      .subscribe( (res: any) => {
        this.showSuccess('Producto actualizado con exito.');
        this.loadProducts();
        console.log(product);
      }, err => {
        console.log(err);
        this._swalService.showError();
      })
  }

  saveNewProduct(product: Product){

    this._productService.setNewProduct( product )
      .subscribe( (res: any) => {
        this.showSuccess('Producto creado con exito.');
        this.loadProducts();
      }, err => {
        this._swalService.showError();
      })
  }

  showSuccess( message: string ){

    Swal.fire({
      icon: 'success',
      title: 'Genial',
      text: message,
    });
  }

}
