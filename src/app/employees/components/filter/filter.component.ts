import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  dropdownList: [] | any;
  selectedItems: [] | any;
  dropdownSettings = {};
  constructor(private router: Router) {}
  filterForm = new FormGroup({
    name: new FormControl(''),
    salary: new FormControl(''),
    department: new FormControl(''),
    experience: new FormControl(''),
    employmentDate: new FormControl(''),
  });

  toppingList: string[] = [
    'Software',
    'Hardware',
    'HR',
    'Accounting',
    'Research',
    'Sales',
    'Embeded',
  ];

  onSubmit() {
    const form = this.filterForm.value;
    this.router.navigate(['employees'], {
      queryParams: {
        name: form.name,
        employmentDate: form.employmentDate,
        salary: form.salary,
        experience: form.experience,
        department: form.department,
      },
      queryParamsHandling: 'merge',
    });
    console.warn(this.filterForm.value);
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  ngOnInit(): void {
    this.dropdownList = [
      'less than a year',
      'From 1-3 years',
      '3 years or above',
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  restFilter() {
    this.filterForm.reset();
    this.router.navigateByUrl('employees');
  }
}
