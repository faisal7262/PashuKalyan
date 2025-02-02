import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Customer from '../Data/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 apiUrl = 'https://backendvet-tj58.onrender.com/'
httpClient = inject(HttpClient);
  constructor() { }

  getCustomer(){
    return this.httpClient.get<Customer[]>(this.apiUrl+'users');
  }

  addCustomer(model:Customer){
    return this.httpClient.post(this.apiUrl+'users',model);
  }

  updateCustomer(id:string, model:Customer){
    return this.httpClient.put(this.apiUrl+'users/'+id, model)
  }

  deleteCustomer(id:string) {
    return this.httpClient.delete(this.apiUrl+'users/'+id)
  }
}
