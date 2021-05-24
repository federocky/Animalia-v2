import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';
//sweet alert
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService,
               private router: Router
    ){}

  canActivate():  boolean  {

    if(this.auth.loggedIn()) return true

    Swal.fire({
      title: 'Necesitas logarte antes ;)',
      showCancelButton: true,
      confirmButtonText: `Ok`,
    });

    this.router.navigateByUrl('/home');
  }

}
