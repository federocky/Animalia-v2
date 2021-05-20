import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  constructor( private _authService: AuthService,
               private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.employeeLogout();
    this.router.navigateByUrl('admin/login');
  }

}
