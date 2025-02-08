import { Component, inject } from '@angular/core';
import Customer from '../Data/customer';
import { CustomerService } from '../services/customer.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../pipes/filter.pipe';
import { RouterLink } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ProductComponent } from "./product/product.component";
import { PackageComponent } from "./package/package.component";
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    FilterPipe,
    AddCustomerComponent,
    ProductComponent,
    PackageComponent
],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  customers: Customer[] = [];
  customerService = inject(CustomerService)
  searchText: string = '';
  selectedCustomer: any = null;
  isEditMode = false;
  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer() {
    this.customerService.getCustomer().subscribe((result) => {
      this.customers = result;
    });
  }

  onCustomerAdded() {
    this.loadCustomer();
  }

  editCustomer(customer: any) {
    this.isEditMode = true;
    this.selectedCustomer = customer;
    
  }

  deleteCustomer(id:string){
    const ok = confirm("are you sure want to delete customer");
    if(ok) {
      this.customerService.deleteCustomer(id).subscribe((res) => {
        this.customers = this.customers.filter((c) => c._id != id);
      })
    }
  }


}
