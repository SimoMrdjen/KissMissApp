import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public users: Customer[] = [];

  constructor() {
    this.users.push(new Customer());
    this.users.push(new Customer());
  }
}
