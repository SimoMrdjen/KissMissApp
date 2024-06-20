import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/app/models/article.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  productForm!: FormGroup;
  products: Article[] = [];
  filteredProducts: Article[] = [];

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      price: [{value: null, disabled: true}, Validators.required],
      amount: [1, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Subscribe to the products observable
    this.invoiceService.products$.subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products.slice(); // To trigger Angular change detection
      },
      error: (error) => console.error('Failed to load products:', error),
    });

    // React to product selection changes to update the price field
    this.productForm.get('product')!.valueChanges.subscribe(productId => {
      const selectedProduct = this.products.find(product => product.id === productId);
      if (selectedProduct) {
        this.productForm.get('price')!.setValue(selectedProduct.price);
      }
    });
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.productForm.reset();
  }

  getAddedProducts() {
    console.log(this.productForm.value);
  }

  searchProducts(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.code?.toLowerCase().includes(value));
  }
}
