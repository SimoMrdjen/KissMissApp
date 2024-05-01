import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { EditCustomerService } from '../services/edit-customer.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {

  public customers: Customer[] = [];
  title: string = '';

  constructor(private editCustomerService: EditCustomerService) {}

    ngOnInit(): void {
      /*
      this.customers = [
        new Customer(1, "Company A", "New York", "John Doe"),
        new Customer(2, "Company B", "Los Angeles", "Jane Smith")
      ];*/
   this.getCustomers();
  }

  getCustomers(): void {
    this.editCustomerService.getCustomers().subscribe({
      next: (response) => {
        console.log(response);
        this.customers = <any>response;
        console.log(this.customers);
      },
      error: (err) => {
        alert('Error occurred');
      },
    });
  }

  openEditCustomer(customer: Customer): void {
    this.title = 'Edit';
    this.editCustomerService.isAddingCustomer = false;
    this.editCustomerService.setCustomer(customer);
    this.editCustomerService.open();
  }
}
