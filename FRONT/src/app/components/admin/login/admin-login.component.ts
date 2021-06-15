import { SwalService } from './../../../services/swal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  showNewEmployee = false;

  myForm: FormGroup;

  email: FormControl;
  password: FormControl;

  constructor( private _authService: AuthService,
               private router: Router,
               private _swalService: SwalService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {

    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  this.setFormControlsVariables();
  }

  setFormControlsVariables(): void {

    const fgName: FormGroup = this.myForm.controls.name as FormGroup;

    this.email          = this.myForm.controls.email           as FormControl;
    this.password       = this.myForm.controls.password        as FormControl;
  }

  onSubmit(): void{

    if (this.myForm.valid){

      this._swalService.showLoading();

      Swal.showLoading();

      this._authService.employeeSignIn(this.email.value, this.password.value)
        .subscribe( res => {

          Swal.close();
          this.router.navigateByUrl('/admin/todo');

        }, err => {

          console.log(err);
          let errorMessage = 'Connection error';
          if(err.error.code == 1) errorMessage = 'El email no existe';
          else if( err.error.code == 2) errorMessage = 'Password incorrecto';

          this._swalService.showError( 'Oops!', errorMessage);
        })
    }

    //lo marca como touched para mostrar los errores.
    this.myForm.markAllAsTouched();
  }


  registerEmployee( newEmployee ){

    this._authService.employeeSignUp( newEmployee )
      .subscribe( (res:any) => {

        this.email.setValue(res.data);
        this.showNewEmployee = false;

      }, err => {

        console.log(err);

        this._swalService.showError();
      } )
  }


}

