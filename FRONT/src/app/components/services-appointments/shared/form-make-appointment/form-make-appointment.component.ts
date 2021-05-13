import { Address } from 'src/app/models/address.model';
import { UserService } from 'src/app/services/user.service';
import { AppointmentService } from './../../../../services/appointment.service';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

//sweet alert
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-make-appointment',
  templateUrl: './form-make-appointment.component.html',
  styleUrls: ['./form-make-appointment.component.scss']
})
export class FormMakeAppointmentComponent implements OnInit {
  @Input() serviceType: string;

  postcodes: number[] = [];

  spin = false;
  cpFound = false;
  cpNotFound = false;
  button = true;
  dateInactive = true;
  hourInactive = true;
  buttonActive = false;
  noHoursMessage = false;

  today = new Date().toISOString().slice(0, 10);

  hoursAvailable: number[] = [];

  postcode: number;
  datePicked: string;
  addresses: Address[] = [];
  servicePrice: number;

  constructor( private _servicesService: ServiceService,
               private _appointmentService: AppointmentService,
               private _userService: UserService
    ) { }

  ngOnInit(): void {
    this._servicesService.getPostcodes()
      .subscribe( (res: any) => {
        this.postcodes = res.data;
      }, err =>{
        console.log(err);
        this.showError();
      });

      this._servicesService.getService( this.serviceType == 'peluqueria' ? 5 : 6)
        .subscribe( (res:any) => {
          this.servicePrice = res.data.price;
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
        this.postcode = +term; 
      } 
      else {
        this.cpNotFound = true;
        this.dateInactive = true;
        this.buttonActive = false;
      } 
      
      this.spin = false;
      
    }, 50);    
  }
  
  /*salta al escribir en el input del postcode*/ 
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
    this.datePicked = date.value;
    this._appointmentService.getAppointmentsByDate( date.value, this.serviceType )
      .subscribe( (res:any) => {
        this.hoursAvailable = res.data;
        if(this.hoursAvailable.length < 1) this.noHoursMessage = true;
        else {
          this.hourInactive = false;
          this.buttonActive = true;
        }
      }, err => {
        console.log(err);
      })
  }  

  getAddresses(){
    this._userService.getUserAddresses()
      .subscribe( (res:any) => {
        if(res.code == 2)  this.addresses = res.data;
      }, err => {
        console.log(err);
        this.showError();
      })
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
