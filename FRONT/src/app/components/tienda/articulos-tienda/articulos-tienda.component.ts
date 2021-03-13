import { Variables } from './../../../common/utils';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-articulos-tienda',
  templateUrl: './articulos-tienda.component.html',
  styleUrls: ['./articulos-tienda.component.scss']
})
export class ArticulosTiendaComponent implements OnInit, OnChanges {

  //cantidad de articulos mostrados en pantalla.
  //puede cambiar según el filtro.
  @Input() qtyPerPage: string;
  @Input() orderBy: string;

  //Almacenaremos todos los productos.
  products: Product [] = [];

  //ruta de las imagenes correspodientes a los productos
  imgRoute: string = Variables.imgRouteProducts;

  ///nos permite implementar el pintado de estrellas
  cantidadEstrellas = [1, 2, 3, 4, 5];

  //controla la paginacion
  curPage: number = 1;


  constructor( private productService: ProductService ) { }

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
    if(changes['orderBy'] && !changes['orderBy'].firstChange) this.orderItems(); 

  }

  //recibe todos los productos
  getProducts(){
    this.productService.getProducts()
      .subscribe( (res:any) => {
        this.products = res.data;
      });
  }


  /**
   * Funcion que ordena los productos segun el criterio seleccionado
   */
  orderItems(): void {

    switch (this.orderBy) {

      case 'precio-asc':
        this.products.sort( (a, b) => a.price - b.price);
        break;

      case 'precio-desc':
        this.products.sort( (a, b) => b.price - a.price);
        break;
      case 'valoracion':
        this.products.sort( (a, b) => b.rating_average - a.rating_average);
        break;
      default:
        this.getProducts();
        break;
    }
  }

  
}
