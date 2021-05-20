import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpGuardGuard implements CanActivate {

  constructor( private auth: AuthService,
               private router: Router
  ){}

canActivate():  boolean  {

if(this.auth.employeeLoggedIn()) return true

this.router.navigateByUrl('admin/login');

}

}
