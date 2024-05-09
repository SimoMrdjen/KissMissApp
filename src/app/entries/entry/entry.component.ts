import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class EntryComponent implements OnInit {
  productForm!: FormGroup;
  products: string[] = ['Artikal 1', 'Artikal 2', 'Artikal 3'];
  filteredProducts: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      price: [null, Validators.required],
      amount: [1, [Validators.required, Validators.min(0)]],
    });
    this.filteredProducts = this.products.slice();
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.productForm.reset();
  }

  getAddedProducts() {
    console.log(this.productForm.value);
  }

  searchProducts(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.products.filter((product) =>
      product.toLowerCase().includes(value.toLowerCase())
    );
  }
}
