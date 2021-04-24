import { Address } from './../../../models/address.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Output() address: EventEmitter<Address>;
  @Output() close: EventEmitter<boolean>;
  @Input() addressRecived: Address;

  myForm: FormGroup;

  street_name: FormControl;
  street_number:  FormControl;
  floor:  FormControl;
  letter:  FormControl;
  province:  FormControl;
  locality:  FormControl;
  town:  FormControl;
  postcode:  FormControl;
  details:  FormControl;

  constructor() { 
    this.address = new EventEmitter();
    this.close = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();

  }

  createForm(): void {

    this.myForm = new FormGroup({
      street_name: new FormControl( this.addressRecived.street_name ? this.addressRecived.street_name : '', Validators.required), 
      street_number: new FormControl(this.addressRecived.street_number ? this.addressRecived.street_number : '', Validators.required),
      floor: new FormControl(this.addressRecived.floor ? this.addressRecived.floor : '', Validators.required),
      letter: new FormControl(this.addressRecived.letter ? this.addressRecived.letter : '', Validators.required),
      province: new FormControl(this.addressRecived.province ? this.addressRecived.province : '', Validators.required),
      locality: new FormControl(this.addressRecived.locality ? this.addressRecived.locality : '', Validators.required),
      town: new FormControl(this.addressRecived.town ? this.addressRecived.town : '', Validators.required),
      postcode: new FormControl(this.addressRecived.postcode ? this.addressRecived.postcode : '', [Validators.required, Validators.pattern('[0-9]{5}')]),
      details: new FormControl(this.addressRecived.details ? this.addressRecived.details : '')
  });

  this.setFormControlsVariables();

  }

  setFormControlsVariables(): void {

    const fgName: FormGroup = this.myForm.controls.name as FormGroup;

    this.street_name    = this.myForm.controls.street_name    as FormControl;
    this.street_number  = this.myForm.controls.street_number  as FormControl;
    this.floor          = this.myForm.controls.floor          as FormControl;
    this.letter         = this.myForm.controls.letter         as FormControl;    
    this.province       = this.myForm.controls.province       as FormControl;
    this.locality       = this.myForm.controls.locality       as FormControl;
    this.town           = this.myForm.controls.town           as FormControl;
    this.postcode       = this.myForm.controls.postcode       as FormControl;
    this.details        = this.myForm.controls.details        as FormControl;

  }

  onSubmit(){

    if( !this.myForm.valid ) this.myForm.markAllAsTouched();
    
    else {
      const address: Address = this.myForm.value;
      
      if( this.addressRecived.id ) address.id = this.addressRecived.id;

      this.address.emit( address );
    }
  }

}
