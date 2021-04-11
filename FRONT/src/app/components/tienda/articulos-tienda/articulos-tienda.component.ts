import { CartService } from './../../../services/cart.service';
import { Product } from './../../../models/product';
import { Variables } from './../../../common/utils';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';


//para el paso de parametros
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos-tienda',
  templateUrl: './articulos-tienda.component.html',
  styleUrls: ['./articulos-tienda.component.scss']
})
export class ArticulosTiendaComponent implements OnInit, OnChanges {

  /**
   * cantidad de articulos mostrados.
   * modo de ordenar los productos.
   * termino de busqueda de productos.
   */
  @Input() qtyPerPage: string;
  @Input() orderBy: string;
  @Input() termToSearch: string;


  //Almacenaremos todos los productos.
  products: Product [] = [];
  productsToShow: Product[] = [];

  //ruta de las imagenes correspodientes a los productos
  imgRoute: string = Variables.imgRouteProducts;

  ///nos permite implementar el pintado de estrellas
  cantidadEstrellas = [1, 2, 3, 4, 5];

  //controla la paginacion
  curPage: number = 1;


  constructor( private productService: ProductService,
               private _router: Router,
               private _cartService: CartService
    ) { }

  ngOnInit(): void {

    //cargar los productos
    this.getProducts();

  }

  ngOnChanges( changes: SimpleChanges ): void {

    /**
     * Si el cambio es en order by y no es la primera vez que se ejecuta
     * salta la funcion de ordenar. Con la segunda condicion evitamos hacer un orden 
     * cuando se carga la pagina por primera vez.
     */
    if(changes['orderBy'] && !changes['orderBy'].firstChange) this.orderProducts(); 


    /**
     * Si el cambio es en el termino de busqueda llamaremos al metodo para buscar productos.
     */
    if(changes['termToSearch'] && !changes['termToSearch'].firstChange) this.searchProducts(); 

  }

  //recibe todos los productos
  getProducts(){
    this.productService.getProducts()
      .subscribe( (res:any) => {
        this.products = res.data;
        this.productsToShow = [...res.data];
      }, err => {
        Swal.fire({
          allowOutsideClick: true,
          title: 'Oops...',
          icon: 'warning',
          text: 'Estamos actualizando nuestra tienda, por favor, vuelva mas tarde'
        });
      });
  }


  /**
   * Funcion que ordena los productos segun el criterio seleccionado
   */
  orderProducts(): void {

    switch (this.orderBy) {

      case 'precio-asc':
        this.productsToShow.sort( (a, b) => a.price - b.price);
        break;

      case 'precio-desc':
        this.productsToShow.sort( (a, b) => b.price - a.price);
        break;
      case 'valoracion':
        this.productsToShow.sort( (a, b) => b.rating_average - a.rating_average);
        break;
      default:
        //reordeno el array a la manera original.
        this.productsToShow = [...this.products];
        break;
    }
  }


  /**
   * Metodo que permite buscar productos.
   */
  searchProducts(): void {

    if(this.termToSearch != '') {

      //primero filtramos todos los productos que contengan el termino de busqueda en el titulo.
      let prod = this.productsToShow.filter( product => product.name.toLowerCase().includes(this.termToSearch.toLowerCase()));
      
      //En segundo lugar almacenamos aquellos que no contienen el termino de busqueda.
      let prodSin = this.productsToShow.filter( product => !product.name.toLowerCase().includes(this.termToSearch.toLowerCase()));

      /*Juntamos ambos array y el resultado es un array de productos, de los cuales primero se mostraran
      aquellos que contengan el termino de busqueda.*/
      this.productsToShow = [...prod, ...prodSin];

    } else {
      //Si no se introduce nada simplemente devolvemos al orden seleccionado.
      this.orderProducts();
    }

  }

  /**
   * Funcion que nos lleva a ver el detalle del producto.  
   * @param id id del producto
   */
  viewProductDetails( id: number ):void {
    this._router.navigate(['tienda', id]); 
  }


  addProduct(product: Product){
    this._cartService.addProduct(product);
  }
  
}
