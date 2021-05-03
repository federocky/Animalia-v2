import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(products: Product[], order: string): unknown {


    if(!products || !order) return products;

    if( order == 'price') return products.sort( (a, b)  => a.price - b.price);
    else if( order == 'name') return products.sort( (a, b) => {
      
      let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
      
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
      
    });
    
    else return products.sort( (a, b) => a.id - b.id);
}
}