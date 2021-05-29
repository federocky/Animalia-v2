import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }


  showLoading(){
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();
  }

  showError( title: string = 'Oops!',  message: string = 'Se ha producido un error, intentelo mas tarde'){
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
    });
  }

}
