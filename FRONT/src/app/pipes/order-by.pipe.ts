import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(items: any[], order: string): unknown {


    if(!items || !order) return items;

    if( order == 'price') return items.sort( (a, b)  => a.price - b.price);
    else if( order == 'name') return items.sort( (a, b) => {
      

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
    
    else return items.sort( (a, b) => a.id - b.id);
}
}