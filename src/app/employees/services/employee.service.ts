import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private url = `assets/data/db.json`;
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }
}
