import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //creamos el formulario y sus controles
  myForm: FormGroup;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  phone: FormControl;
  password: FormControl;
  repeatPassword:  FormControl;

  constructor( private _authService: AuthService,
                private router: Router,
                private fb: FormBuilder
    ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {

    this.myForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]+')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('',)
  },{
    validators: this.passwordsIguales('password', 'repeatPassword')
  });

  this.setFormControlsVariables();

  }

  /**Validacion personalizada para garantizar que las contraseñas
   * sean iguales.
   */
  passwordsIguales( pass1Name: string, pass2Name: string){

    return( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }else {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }



  setFormControlsVariables(): void {

    const fgName: FormGroup = this.myForm.controls.name as FormGroup;

    this.name           = this.myForm.controls.name            as FormControl;
    this.surname        = this.myForm.controls.surname         as FormControl;
    this.email          = this.myForm.controls.email           as FormControl;
    this.phone          = this.myForm.controls.phone           as FormControl;
    this.password       = this.myForm.controls.password        as FormControl;
    this.repeatPassword = this.myForm.controls.repeatPassword  as FormControl;

  }


  /**Cuando se envia el formulario */
  onSubmit(): void{

    if (this.myForm.valid){

      //mostramos un mensaje de procesando
      Swal.fire({
        //para que no se cierre al hacer click fuera como un modal
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor'
      });
      Swal.showLoading();

      //creamos un usuario aux
      const user: User = { ... this.myForm.value }


      ///registramos el usuario en la bbdd
      this._authService.signUp(user)
        .subscribe( (res: any) => {

          Swal.close();

          //guardamos el email y nos vamos a login
          localStorage.setItem('email', res.data);
          this.router.navigateByUrl('main/login');

        }, err => {

          let errorMessage: string = err.error.code == 1 ? 'El email ya existe' : 'Error de conexion';
          console.log(err);
          Swal.fire({
            allowOutsideClick: true,
            title: 'ERROR',
            icon: 'error',
            text: errorMessage
          });
        })
    }

    //si el form no es valido lo marca como touched para mostrar los errores.
    this.myForm.markAllAsTouched();
  }

}
