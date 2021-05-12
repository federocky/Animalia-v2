import { AppointmentService } from './../../../../services/appointment.service';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

//sweet alert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-make-appointment',
  templateUrl: './form-make-appointment.component.html',
  styleUrls: ['./form-make-appointment.component.scss']
})
export class FormMakeAppointmentComponent implements OnInit {

  postcodes: number[] = [];

  spin = false;
  cpFound = false;
  cpNotFound = false;
  button = true;
  dateInactive = true;
  hourInactive = true;
  buttonActive = false;

  today = new Date().toISOString().slice(0, 10);

  hoursAvailable: string[] = ['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00']; 
  hoursBooked: string[] = []; 
  hoursUnabailable: string[] = [];
  
  constructor( private _servicesService: ServiceService,
               private _appointmentService: AppointmentService
    ) { }

  ngOnInit(): void {
    this._servicesService.getPostcodes()
      .subscribe( (res: any) => {
        this.postcodes = res.data;
      }, err =>{
        console.log(err);
        this.showError();
      });
  }

  checkingPostcode( term: string ){
    this.spin = true;
    this.cpFound = false;
    this.cpNotFound = false;
    this.button = false;
    
    setTimeout(() => {
      
      if( this.postcodes.includes(+term) ) {
        this.cpFound = true;
        this.dateInactive = false;        
      } 
      else {
        this.cpNotFound = true;
        this.dateInactive = true;
        this.buttonActive = false;
      } 
      
      this.spin = false;
      
    }, 2000);    
  }

  showButton( e, postcode ){
    if( e.keyCode == 13 ) this.checkingPostcode( postcode.value );
    else {      
      this.cpFound = false;
      this.cpNotFound = false;
      this.spin = false;
      this.button = true;
    }
  }

  dateSelected( date ){
    this._appointmentService.getAppointmentsByDate( date.value )
      .subscribe( (res:any) => {
        this.hoursBooked = res.data;
        this.loadHours();
      }, err => {
        console.log(err);
      })
  }

  loadHours(){


    for(let i = 0; i < this.hoursBooked.length; i++){
      for(let j = i+1; j < this.hoursBooked.length; j++){
         if(this.hoursBooked[i] == this.hoursBooked[j])  this.hoursUnabailable.push(this.hoursBooked[i]);
      }
    }


    this.hourInactive = false;
    console.log(this.hoursUnabailable);

  }


  showError(){
    Swal.fire({
      allowOutsideClick: true,
      title: 'Oops...',
      icon: 'warning',
      text: 'Algo ha id mal'
    });
  }

}
