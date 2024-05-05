import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { customersData } from '../database/customers';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers = customersData;
  // private url = '/' stavi api koji gadjas npr ako je localhost 5700 onda private url = 'http://localhost:5700/'

  constructor(private http: HttpClient) {}

  // OVA METODA JE ZA TESTIRANJE DOBAVLJANJA PODATAKA PREKO CUSTOMERS.TS FAJLA
  // getCustomers(): Observable<Customer[]> {
  //   return of(this.customers);
  // }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.url);
  }
  // public users: Customer[] = [];

  // constructor() {
  //   this.users.push(new Customer());
  //   this.users.push(new Customer());
  // }
}
