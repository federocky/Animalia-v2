import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], term: string): unknown {

    if(!products || !term) return products;
    return products.filter( product => product.name.toLowerCase().includes(term.toLowerCase()));
  }

}
