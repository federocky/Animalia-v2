import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  public user: User;

  public changeName = false;
  public changeEmail = false;
  public changePhone = false;
  

  myForm: FormGroup;

  name: FormControl;
  email: FormControl;
  phone: FormControl;



  constructor( private _userService: UserService) { 
   
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

  this.setFormControlsVariables();

}


  setFormControlsVariables(): void {
  
    const fgName: FormGroup = this.myForm.controls.name as FormGroup;
  
    this.name          = this.myForm.controls.name           as FormControl;
    this.email          = this.myForm.controls.email           as FormControl;
    this.phone          = this.myForm.controls.phone           as FormControl;
  }

  
  onSubmit(): void{

    console.log("object");

    if (this.myForm.valid){

      console.log("object");
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

          console.log(res);
          

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
