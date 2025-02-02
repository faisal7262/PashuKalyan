import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product from '../Data/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://backendvet-tj58.onrender.com/'
  httpClient = inject(HttpClient);
  constructor() { }

  getProduct() {
    return this.httpClient.get<Product[]>(this.apiUrl + 'products');
  }

  addProduct(model: Product) {
    return this.httpClient.post(this.apiUrl + 'products', model);
  }

  updateProduct(id: string, model: Product) {
    return this.httpClient.put(this.apiUrl + 'products/' + id, model)
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.apiUrl + 'products/' + id)
  }
}
