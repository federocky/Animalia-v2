import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from './../../../services/order.service';
import { Person } from './../../../models/person.model';
import { Address } from '../../../models/address.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent implements OnInit {

  //TODO:sin usar de momento
  person: Person;
  address: Address;



  myForm: FormGroup;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  phone: FormControl;


  constructor( private _orderService: OrderService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {

    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required), 
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('')
  });

  this.setFormControlsVariables();

  }

  setFormControlsVariables(): void {

    const fgName: FormGroup = this.myForm.controls.name as FormGroup;

    this.name     = this.myForm.controls.name    as FormControl;
    this.surname  = this.myForm.controls.surname as FormControl;
    this.email    = this.myForm.controls.email   as FormControl;
    this.phone    = this.myForm.controls.phone   as FormControl;
  }


  onSubmit(){
    this.person = this.myForm.value;
    console.log(this.person);
    console.log(this.address);
  }

  addressRecived( address: Address ){
    this.address = address;
  }
}
