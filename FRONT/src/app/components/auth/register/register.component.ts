import { User } from './../../../../../../BACK/server/src/models/user.model';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  repeatPassword:  FormControl;

  constructor( private _authService: AuthService,
                private router: Router
    ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {

    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required), 
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', Validators.required)
      //FIXME: comprobar que la contraseña no se pueda repetir, ver fernando formularios.
  });

  this.setFormControlsVariables();

  }

  setFormControlsVariables(): void {

    const fgName: FormGroup = this.myForm.controls.name as FormGroup;

    this.name           = this.myForm.controls.name            as FormControl;
    this.surname        = this.myForm.controls.surname         as FormControl;
    this.email          = this.myForm.controls.email           as FormControl;
    this.password       = this.myForm.controls.password        as FormControl;    
    this.repeatPassword = this.myForm.controls.repeatPassword  as FormControl;

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

      const user: User = {
        name: this.name.value,
        surname: this.surname.value,
        email: this.email.value,
        password: this.password.value
      }

      this._authService.signUp(user)
        .subscribe( res => {


          Swal.close();

          this.router.navigateByUrl('/login');

        }, err => {
          console.log(err);

          Swal.fire({
            allowOutsideClick: true,
            title: 'ERROR',
            icon: 'error',
            text: 'El email ya existe'
          });
        })
    }
    
    //lo marca como touched para mostrar los errores.
    this.myForm.markAllAsTouched();
  }

}
