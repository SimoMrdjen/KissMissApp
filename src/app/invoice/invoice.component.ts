import { Call } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Article } from '../models/article.model';
import { Customer } from '../models/customer.model';
import InvoiceItem from '../models/invoice-item.model';
import { Invoice } from '../models/invoice.model';
import { ArticleService } from '../services/article.service';
import { CustomerService } from '../services/customer.service';
import { EditCustomerService } from '../services/edit-customer.service';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  productForm: FormGroup; // Removed the '!' for demonstration.
  customers$: Observable<Customer[]> = of([]);
  filteredCustomers$: Observable<Customer[]> | undefined;
  invoice?: Invoice;
  invoiceItems: InvoiceItem[] = [];
  customer?: Customer;
  discount: number = 0;
  products: Article[] = [];


  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private editCustomerService: EditCustomerService,
    private invoiceService: InvoiceService
  ) {
    this.productForm = this.fb.group({
      customer: ['', Validators.required],
      discount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.invoiceService.products$.subscribe(products => {
      this.products = products;
    });
    
    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        console.error('Failed to fetch customers', err);
        return of([]);
      })
    );

    this.filteredCustomers$ = this.productForm.get('customer')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.filterCustomers(value))
    );
  }

  filterCustomers(value: string): Observable<Customer[]> {
    const filterValue = value.toLowerCase();
    return this.customers$.pipe(
      map(customers => customers.filter(customer => customer.company.toLowerCase().includes(filterValue)))
    );
  }

  onSubmit(): void {
    console.log(this.productForm.value + "aaaaaa");
    // TODO add 
    this.invoiceService.invoice.customer = this.customer;
    this.invoiceService.invoice.discount = this.discount;
    this.invoiceService.invoice.date = new Date;

    this.productForm.reset();
  }

  getCustomers() {
    this.editCustomerService.getCustomers().subscribe({
      next: (response) => {
        console.log(response);
        this.customers$ = <any>response;
        console.log(this.customers$);
      },
      error: (err) => {
        alert('Error occurred');
      },
    });
  }

  getAddedProducts(): void {
    console.log(this.productForm.value);
  }

  searchProducts(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filteredCustomers$ = this.filterCustomers(value);
  }
}
function switchDispatch(arg0: (value: any) => Observable<Customer[]>): import("rxjs").OperatorFunction<any, Customer[]> {
  throw new Error('Function not implemented.');
}

