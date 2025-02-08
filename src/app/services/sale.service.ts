import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Sale from '../Data/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor() { }
       apiUrl = 'https://backendvet-tj58.onrender.com/'
      httpClient = inject(HttpClient);

          addSale(model: Sale) {
            return this.httpClient.post(this.apiUrl + 'sales', model);
          }

          getSales() {
                  return this.httpClient.get<Sale[]>(this.apiUrl + 'sales');
          }

          getSale(id: string) {
            return this.httpClient.get<Sale>(`${this.apiUrl}sales/${id}`);
          }
          
          updateSale(id: string, model: Sale) {
            return this.httpClient.put(this.apiUrl + 'sales/' + id, model);
          }
}
