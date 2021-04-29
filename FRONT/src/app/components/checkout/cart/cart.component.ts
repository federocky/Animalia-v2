import  Swal  from 'sweetalert2';
import { AuthService } from './../../../services/auth.service';
import { ProductQty } from './../../../models/product-qty';
import { Cart } from './../../../models/cart.model';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Variables } from 'src/app/common/utils';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  //ruta de la imagen
  imgRoute: string = Variables.imgRouteProducts;

  //carro donde almacenamos los productos
  cart: Cart;

  //cantidad de articulos en el carro
  itemCount: number;

  //variable necesario para pintar estrellas
  cantidadEstrellas = [1, 2, 3, 4, 5];

  constructor(private _cartService: CartService,
              private _authService: AuthService,
              private router: Router
    ) { }

  ngOnInit(): void {
    //recibimos el carro
    this.getCart();
    
    //recibimos la cantidad de artuculos que contiene el carro
    this.getCartItemCount();
  }

  /**
   * Nos suscribimos a la cantidad de articulos que contiene el carro.
   */
  private getCartItemCount() {
    this._cartService.getCartItemCount()
      .subscribe((res: number) => {
        this.itemCount = res;
      });
  }

  /**
   * Nos suscribimos al carro.
   */
  getCart() {
    this._cartService.getCart()
      .subscribe((res: Cart) => {
        this.cart = res;
      });
  }

  /**
   * quita una unidad de producto
   * @param product productQty
   */
  decreaseItem(product: ProductQty): void{
    if(product.qty > 1) {
      this._cartService.decreaseProduct(product.product);
    }
  }

  /**
   * aumenta una unidad de producto si el stock lo permite
   * @param product ProductQty
   */
  increaseItem(product: ProductQty): void{
    if(product.product.stock > product.qty) this._cartService.increaseProduct(product);
  }

  /**
   * Elimina el producto y todas sus unidades del carro.
   * @param product ProductQty
   */
  deleteProduct( product: Product ):void{
    this._cartService.removeProduct( product );
  }


  checkout(): void{
  
      /**si esta logado */
      if(this._authService.loggedIn()) this.router.navigateByUrl('/main/checkout/detalles');
      
      else {
        /**si no esta logado mostramos un alert con opcion de login o continuar como invitado */
        Swal.fire({
        allowOutsideClick: true,
        title: 'No esta logado',
        icon: 'info',
        showCloseButton: true,
        
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: `Inicia sesión / Registrate`,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#8BC34A',
        
      }).then((result) => {
        //si se elige logar/registrar
        if(result.isConfirmed) this.router.navigateByUrl('/main/login');
      });
    }
  
  }
  
}
