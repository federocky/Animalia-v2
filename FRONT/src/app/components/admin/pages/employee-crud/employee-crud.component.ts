import { SwalService } from './../../../../services/swal.service';
import { EmployeeService } from './../../../../services/employee.service';
import { Employee } from './../../../../models/employee.model';
import { Component, OnInit } from '@angular/core';

//sweet alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.scss']
})
export class EmployeeCrudComponent implements OnInit {

  employees: Employee[] = [];
  openForm = false;
  employee: Employee;
  term: string;
  order:string;

  constructor( private _employeeService: EmployeeService,
              private _swalService: SwalService) { }

  ngOnInit(): void {
    this._swalService.showLoading();
    this.loadEmployees();
  }


  loadEmployees(){
    this._employeeService.getEmployees()
      .subscribe( (res: any) => {

        this.employees = res.data;
        Swal.close();

      }, err => {
        console.log(err);

        this._swalService.showError();
      })
  }

  delete( id: number){
    this._employeeService.deleteEmployee( id )
      .subscribe( (res:any) => {
        this.loadEmployees();
      }, err => {
        this._swalService.showError();
      })
  }

  activate( id: number) {
    this._employeeService.recoverEmployee( id )
      .subscribe( (res: any) => {
        this.loadEmployees();
      }, err => {
        console.log(err);
        this._swalService.showError();
      })
  }

  openNewForm(){
    this.employee = null;
    this.openForm = true;
  }

  showSuccess( message: string ){

    Swal.fire({
      icon: 'success',
      title: 'Genial',
      text: message,
    });
  }

}
