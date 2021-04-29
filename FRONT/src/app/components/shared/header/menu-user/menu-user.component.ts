import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {

  signedIn: boolean;

  constructor(private _authService: AuthService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this._authService.getSignedIn()
      .subscribe( res => {
        this.signedIn = res;
    });
  }

  logOut(){
    this._authService.logOut();
    this.router.navigateByUrl('index');
  }

}
