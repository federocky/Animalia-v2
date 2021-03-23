import { CartService } from './../../../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  itemCount: BehaviorSubject<number>;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.itemCount = this.cartService.getCartItemCount();
  }

}
