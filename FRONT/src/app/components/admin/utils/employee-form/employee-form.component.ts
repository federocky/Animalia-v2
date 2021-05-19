import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from './../../../../models/employee.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Output() employee: EventEmitter<Employee>;
  @Output() close: EventEmitter<boolean>;
  @Input() employeeRecived: Employee;

  myForm: FormGroup;

  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  is_admin: FormControl;
  phone: FormControl;
  salary: FormControl;
  details: FormControl;

  constructor() {
    this.employee  = new EventEmitter();
    this.close     = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      is_admin: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      details: new FormControl('')
    });

    this.setFormControlsVariables();
  }

  setFormControlsVariables(): void {

    const fgName: FormGroup = this.myForm.controls.name as FormGroup;

    this.name      = this.myForm.controls.name      as FormControl;
    this.surname   = this.myForm.controls.surname   as FormControl;
    this.email     = this.myForm.controls.email     as FormControl;
    this.password  = this.myForm.controls.password  as FormControl;
    this.is_admin  = this.myForm.controls.is_admin  as FormControl;
    this.phone     = this.myForm.controls.phone     as FormControl;
    this.salary    = this.myForm.controls.salary    as FormControl;
    this.details   = this.myForm.controls.details   as FormControl;

    if(this.employeeRecived){

      this.myForm.setValue({
        name: this.employeeRecived.name,
        surname: this.employeeRecived.surname,
        email: this.employeeRecived.email,
        password: this.employeeRecived.password,
        is_admin: this.employeeRecived.is_admin,
        phone: this.employeeRecived.phone,
        salary: this.employeeRecived.salary,
        details: this.employeeRecived.details,
      });
    }
  }

  onSubmit(){

    if( !this.myForm.valid ) this.myForm.markAllAsTouched();

    else {
      const employee: Employee = this.myForm.value;

      if( this.employeeRecived ) employee.id = this.employeeRecived.id;

      this.employee.emit( employee );
    }
  }

}
