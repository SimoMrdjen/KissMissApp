import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article.model';
import { Customer } from '../models/customer.model';
import { Invoice } from '../models/invoice.model';
import { ArticleService } from './article.service';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private productsSubject = new BehaviorSubject<Article[]>([]);
  public products$ = this.productsSubject.asObservable();
  public invoice: Invoice = new Invoice();

  constructor(private articleService: ArticleService) {
    this.loadProducts();
  }

  private loadProducts() {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        this.productsSubject.next(articles);
      },
      error: (err) => {
        console.error('Failed to fetch articles', err);
        this.productsSubject.next([]);
      }
    });
  }

  resetInvoice() {
    // Resets the invoice to initial state
    this.invoice = new Invoice();
  }
}
