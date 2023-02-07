import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employeeList: Employee[] = [];
  employessFilter: Employee[] = [];
  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute
  ) {}
  getAllEmployess() {
    this.empService.getAllEmployees().subscribe((data) => {
      this.employeeList = data;
      this.employessFilter = this.employeeList;
      console.log(data);
    });
  }
  getParams() {
    this.route.queryParams.subscribe((params: any) => {
      this.setFilter(params);
    });
  }

  setFilter(value: Employee) {
    this.employessFilter = [];
    this.employessFilter = this.employeeList.filter((data: Employee) => {
      const { name, salary, department, employmentDate, experience } = value;

      // console.log(department);
      const dateParam = new Date(
        JSON.stringify(employmentDate)
      ).toLocaleDateString('en-GB');

      return (
        (name ? data.name.toLowerCase().includes(name.toLowerCase()) : true) &&
        (salary ? data.salary.toString().includes(salary.toString()) : true) &&
        (employmentDate ? data.employmentDate.includes(dateParam) : true) &&
        (department
          ? data.department.toLowerCase().includes(department.toLowerCase())
          : true) &&
        (experience == 'less than a year'
          ? data.experience?.toLowerCase().includes('less')
          : experience == 'From 1-3 years'
          ? data.experience?.toLowerCase().match(/[2-3]+/g)
          : experience == '3 years or above'
          ? data.experience?.toLowerCase().match(/([3-9]|[1-4][0-9])/g)
          : true)
      );
    });
  }

  ngOnInit(): void {
    this.getAllEmployess();
    this.getParams();
  }
}
