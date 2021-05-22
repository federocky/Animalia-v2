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

  constructor( private _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.showLoading();
    this.loadEmployees();
  }


  loadEmployees(){
    this._employeeService.getEmployees()
      .subscribe( (res: any) => {

        this.employees = res.data;
        Swal.close();

      }, err => {
        console.log(err);

        Swal.fire({
          allowOutsideClick: true,
          title: 'Oops...',
          icon: 'warning',
          text: 'Error en la conexión'
        });
      })
  }

  delete( id: number){
    this._employeeService.deleteEmployee( id )
      .subscribe( (res:any) => {
        this.loadEmployees();
      }, err => {
        this.showError();
      })
  }

  activate( id: number) {
    this._employeeService.recoverEmployee( id )
      .subscribe( (res: any) => {
        this.loadEmployees();
      }, err => {
        console.log(err);
        this.showError();
      })
  }

  openNewForm(){
    this.employee = null;
    this.openForm = true;
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
      text: 'Algo ha ido mal, intentelo mas tarde'
    });
  }

  showSuccess( message: string ){

    Swal.fire({
      icon: 'success',
      title: 'Genial',
      text: message,
    });
  }

}
