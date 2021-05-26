import { CartService } from './../../../services/cart.service';
import { ProductService } from './../../../services/product.service';
import { Variables } from './../../../common/utils';
import { Product } from './../../../models/product';
import { Component, OnInit} from '@angular/core';

//para recibir parametros
import { ActivatedRoute, Params, Router } from '@angular/router';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-card-tienda',
  templateUrl: './articulo-card-tienda.component.html',
  styleUrls: ['./articulo-card-tienda.component.scss']
})
export class ArticuloCardTiendaComponent implements OnInit {


  product: Product;
  productId: number;
  qtyOfProduct: number = 1;
  outOfStock: boolean = false;
  imgToShow: string;
  showBigImg: boolean = false;

  ///nos permite implementar el pintado de estrellas
  cantidadEstrellas = [1, 2, 3, 4, 5];

  //ruta de la imagen
  imgRoute: string = Variables.imgRouteProductsDetails;
  imgRouteBig: string = Variables.imgRouteProductsBig;

  constructor( private _productService: ProductService,
              private _activatedRoute: ActivatedRoute,
              private _cartService: CartService,
              private _router: Router
    ) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe ( (params: Params) => {
      this.productId = +params['id'];

      this.getProduct();
    });
  }

  getProduct(): void {
    console.log('object');
    this._productService.getProduct( this.productId )
      .subscribe( (res:any) => {
        this.product = res.data[0];
        this.imgToShow = this.product.img;
      }, err => {
        this.showError();
      });
  }

  addProduct( product: Product ){
    this._cartService.addProduct(product, this.qtyOfProduct);
  }

  buyNow( product: Product ){
    this._cartService.addProduct(product, this.qtyOfProduct);
    this._router.navigateByUrl('main/checkout/carrito');
  }

  decreaseItem(product: Product): void{
    if(this.qtyOfProduct > 1) this.qtyOfProduct --;
    if(this.outOfStock) this.outOfStock = false;
  }

  increaseItem(product: Product): void{
    if(product.stock > this.qtyOfProduct) this.qtyOfProduct ++;
    else this.outOfStock = true;
    setTimeout(() => {
      this.outOfStock = false;
    }, 4000);
  }


  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha id mal'
    });
  }
}
