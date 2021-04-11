import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;

  email: FormControl;
  password: FormControl;


  constructor( private _authService: AuthService,
                private router: Router
    ) {
    this.createForm();
   }

  ngOnInit(): void {
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

    Swal.fire({
      //para que no se cierre al hacer click fuera como un modal
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this._authService.signIn(this.email.value, this.password.value)
      .subscribe( res => {

        Swal.close();
        this.router.navigateByUrl('/tienda');

      }, err => {

        let errorMessage = 'Connection error';
        if(err.error.code == 1) errorMessage = 'El email no existe';
        else if( err.error.code == 2) errorMessage = 'Password incorrecto';

        Swal.fire({
          allowOutsideClick: true,
          title: 'ERROR',
          icon: 'error',
          text: errorMessage
        });
      })
  }
  
  //lo marca como touched para mostrar los errores.
  this.myForm.markAllAsTouched();
}

}