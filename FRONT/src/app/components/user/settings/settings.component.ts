import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User;

  changeName = false;
  changeEmail = false;
  changePhone = false;

  showPasswordForm = false;
  

  myForm: FormGroup;
  passwordForm: FormGroup;

  name: FormControl;
  email: FormControl;
  phone: FormControl;

  oldPassword: FormControl;
  newPassword: FormControl;
  repeatPassword: FormControl;



  constructor( private _userService: UserService,
               private fb: FormBuilder
    ) { 
   
  }


  
  ngOnInit(): void {
    
    this.showLoading();
    
    let userId = JSON.parse(localStorage.getItem('user')).id;

    this.loadUser(userId);
  }


  loadUser( id: number ){
    this._userService.getUser(id)
    .subscribe( (res:any) => {
      
      this.user = res.data[0];
      Swal.close();
      this.createForm();

    }, err => {
      this.showError();

    });
  }



  createForm(): void {

    this.myForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern('[^ @]*@[^ @]+')]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern('[0-9]{9}')])
    });

    this.passwordForm = this.fb.group({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('',)
  },{
    validators: this.passwordsIguales('newPassword', 'repeatPassword')
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
  
    this.name          = this.myForm.controls.name           as FormControl;
    this.email          = this.myForm.controls.email           as FormControl;
    this.phone          = this.myForm.controls.phone           as FormControl;

    const fgPassword: FormGroup = this.passwordForm.controls.name as FormGroup;

    this.oldPassword          = this.passwordForm.controls.oldPassword     as FormControl;
    this.newPassword          = this.passwordForm.controls.newPassword     as FormControl;    
    this.repeatPassword       = this.passwordForm.controls.repeatPassword  as FormControl;
  }

  
  onSubmit(): void{

    if (this.myForm.valid){

      //mostramos un mensaje de procesando
      this.showLoading();

      ///registramos el usuario en la bbdd
      this._userService.updateUser( this.user )
        .subscribe( res => {

          Swal.close();

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Datos cambiados correctamente',
          });

          this.changeEmail = false;
          this.changeName = false;
          this.changePhone = false;

        }, err => {

          Swal.fire({
            allowOutsideClick: true,
            title: 'ERROR',
            icon: 'error',
            text: 'Oop... Algo No ha ido bien'
          });
        });
    }
    
    //si el form no es valido lo marca como touched para mostrar los errores.
    this.myForm.markAllAsTouched();
    this.changeEmail = true;
    this.changeName = true;
    this.changePhone = true;
  }


  submitPassword(): void{
    if (this.passwordForm.valid){
      
      //mostramos un mensaje de procesando
      this.showLoading();

      this._userService.updatePassword(this.user.id, this.oldPassword.value, this.newPassword.value)
        .subscribe( (res: any) => {

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Contraseña cambiada correctamente',
          }).finally(() => {
            this.showPasswordForm = false;
          });

        }, err => {

          let msg = 'Algo ha ido mal, intentelo mas tarde.';
          if(err.error.code == 1) msg = 'Usuario no encontrado, vuelva a logarse';
          else if (err.error.code == 2) msg = 'Password incorrecto, vuelva a intentarlo';
          
          Swal.fire({
            allowOutsideClick: true,
            title: 'ERROR',
            icon: 'error',
            text: `Oops... ${msg}`
          });
        })


    }else {
      this.passwordForm.markAllAsTouched();
    }
  }


  showLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
  }

  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Estamos actualizando nuestra tienda, por favor, vuelva mas tarde'
    });
  }

}
