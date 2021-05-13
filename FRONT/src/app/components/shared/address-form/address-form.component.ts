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
      street_name: new FormControl('', Validators.required),
      street_number: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      letter: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      postcode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
      details: new FormControl('')
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



    if(this.addressRecived){

      this.myForm.setValue({
        street_name: this.addressRecived.street_name,
        street_number: this.addressRecived.street_number,
        floor: this.addressRecived.floor,
        letter: this.addressRecived.letter,
        province: this.addressRecived.province,
        locality: this.addressRecived.locality,
        town: this.addressRecived.town,
        postcode: this.addressRecived.postcode,
        details: this.addressRecived.details
      });
    }
  }

  onSubmit(){

    if( !this.myForm.valid ) this.myForm.markAllAsTouched();

    else {
      const address: Address = this.myForm.value;

      if( this.addressRecived ) address.id = this.addressRecived.id;

      this.address.emit( address );
    }
  }

}
