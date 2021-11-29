import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

import { EmployeeService } from '../shared/employee.service';

declare const M : any; 

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor( public employeeService: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.reFreshEmployeeList();
  }

onSubmit(form: NgForm){
  if(form.value._id == ""){
  this.employeeService.postEmployee(form.value).subscribe((res) => {
    this.resetForm(form); 
    this.reFreshEmployeeList();
  });
  M.toast ({ html: 'Saved successfully', classes: 'rounded'}); 
}else{
  this.employeeService.putEmployee(form.value).subscribe((res) => {
    this.resetForm(form); 
    this.reFreshEmployeeList();
  });
  M.toast ({ html: 'Update successfully', classes: 'rounded'}); 
}}



  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.employeeService.selectedEmployee = {
      _id:"",
      name:"",
      position:"",
      office:"",
      salary: 0
    }
  }
  reFreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[]; 
    })
  }


  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp; 
  }
  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you ure to delete this record ? ') == true){
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.reFreshEmployeeList();
        this.resetForm(form); 
        M.toast({ html: 'Deleted successfully', classes: 'rounded'});
      })
    }
  }
}
