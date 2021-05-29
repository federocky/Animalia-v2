import { SwalService } from './../../../../services/swal.service';
import { Router } from '@angular/router';
import { Service } from './../../../../models/service.model';
import { User } from './../../../../models/user.model';
import { Address } from './../../../../models/address.model';
import { UserService } from 'src/app/services/user.service';
import { AppointmentService } from './../../../../services/appointment.service';
import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

//sweet alert
import Swal from 'sweetalert2';
import { Appointment } from 'src/app/models/appointment.model';


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
  openAddressForm = false;
  addressError = false;

  today = new Date().toISOString().slice(0, 10);

  hoursAvailable: number[] = [];

  service: Service;
  user: User;
  datePicked: string;
  addresses: Address[] = [];
  address_id : number;
  userAddress: Address = {
    street_name : '',
    street_number: '',
    floor: '',
    letter: '',
    province: '',
    locality: '',
    town: '',
    postcode: 5,
    details: ''
  }
  selectedHour: number;

  constructor( private _servicesService: ServiceService,
               private _appointmentService: AppointmentService,
               private _userService: UserService,
               private _router: Router,
               private _swalService: SwalService
    ) { }

  ngOnInit(): void {
    this._servicesService.getPostcodes()
      .subscribe( (res: any) => {
        this.postcodes = res.data;
      }, err =>{
        console.log(err);
        this._swalService.showError( "Oops!" ,"Tenemos un error momentaneo, danos 5 minutos e intentalo otra vez" );
      });

      this._servicesService.getService( this.serviceType == 'peluqueria' ? 5 : 6)
        .subscribe( (res:any) => {
          this.service = res.data;
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
        this.userAddress.postcode = +term;
      }
      else {
        this.cpNotFound = true;
        this.dateInactive = true;
        this.buttonActive = false;
      }

      this.spin = false;

    }, 250);
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

  onReserve( hour: string = '' ){
    if(hour != '') this.selectedHour = +hour;

    const cuttedDate = this.datePicked.split('-');
    if(new Date(+cuttedDate[0], +cuttedDate[1]-1, +cuttedDate[2], this.selectedHour+2) < new Date( Date.now())){
      this._swalService.showError( "Oops!", "No puedes elegír una fecha anterior a la actual");
      this._router.navigateByUrl("index");
    };

    this._userService.getUserAddresses()
      .subscribe( (res:any) => {
        if(res.code == 2) {
          this.addresses = res.data;
          this.addresses = this.addresses.filter( address => address.postcode == this.userAddress.postcode);
        }
      }, err => {
        console.log(err);
        this._swalService.showError( "Oops!", "Hemos sufrido un error cogiendo tus direcciones, vuelvete a logar porfa" );
      });

    /**Si esta logado recupero los datos de usuario del local storage*/
    this.user = JSON.parse(localStorage.getItem('user'));

  }

  setAddress( address: Address ){
    this._userService.setAddress( address)
      .subscribe( (res:any) => {
        this.onReserve();
        this.openAddressForm = false;

      }, err => {
        console.log(err);
        this._swalService.showError( "Oops!", "Hemos sufrido un error guardando tu direccion, vuelvete a logar porfa." );
      })
  }


  savePhone(){
    this._userService.updateUser( this.user )
      .subscribe( (res:any) => {
        if(res.ok) localStorage.setItem('user', JSON.stringify(this.user));
      }, err => {
        console.log(err);
      });
  }

  makeAppointment(){

    if( !this.address_id){
      this.addressError = true;
      return
    }

    const cuttedDate = this.datePicked.split('-');

    const appointment: Appointment = {
      service_id : this.service.id,
      date_appointment_from: new Date(+cuttedDate[0], +cuttedDate[1]-1, +cuttedDate[2], this.selectedHour+2),
      date_appointment_to: new Date(+cuttedDate[0], +cuttedDate[1]-1, +cuttedDate[2], this.selectedHour+2+1),
      user_id: this.user.id,
      price: this.service.price,
      address_id: this.address_id
    }

    localStorage.setItem('appointment', JSON.stringify(appointment));
    this._router.navigateByUrl('main/servicios/pasarela');
  }

}
