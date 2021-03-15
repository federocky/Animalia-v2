import { ProductService } from './../../../services/product.service';
import { Variables } from './../../../common/utils';
import { Product } from './../../../models/product';
import { Component, OnInit} from '@angular/core';

//para recibir parametros
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-articulo-card-tienda',
  templateUrl: './articulo-card-tienda.component.html',
  styleUrls: ['./articulo-card-tienda.component.scss']
})
export class ArticuloCardTiendaComponent implements OnInit {


  product: Product;
  productId: number;

  //ruta de las imagenes correspodientes a los productos
  imgRoute: string = Variables.imgRouteProducts;

  constructor( private productService: ProductService,
              private _activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe ( (params: Params) => {
      this.productId = params['id'];

      this.getProduct();
    });
  }

  getProduct(): void {
    this.productService.getProduct( this.productId )
      .subscribe( (res:any) => {
        this.product = res.data;
      });
  }

}
