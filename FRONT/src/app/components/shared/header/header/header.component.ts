import { AuthService } from './../../../../services/auth.service';
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
  signedIn: boolean;
  
  constructor(private _cartService: CartService,
              private _authService: AuthService
    ) { }

  ngOnInit(): void {
    this.itemCount = this._cartService.getCartItemCount();
    this._authService.getSignedIn()
      .subscribe( res => {
        this.signedIn = res;
      });
  }  

}
