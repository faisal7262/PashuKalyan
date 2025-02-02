import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Package from '../Data/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor() { }

     apiUrl = 'https://backendvet-tj58.onrender.com/'
    httpClient = inject(HttpClient);
  
    getPackage() {
      return this.httpClient.get<Package[]>(this.apiUrl + 'packages');
    }
  
    addPackage(model: Package) {
      return this.httpClient.post(this.apiUrl + 'packages', model);
    }
  
    updatePackage(id: string, model: Package) {
      return this.httpClient.put(this.apiUrl + 'packages/' + id, model)
    }
  
    deletePackage(id: string) {
      return this.httpClient.delete(this.apiUrl + 'packages/' + id)
    }
    
}
