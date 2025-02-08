import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Customer from '../../Data/customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JavaScript functions
@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {
  fb = inject(FormBuilder);
  customerService = inject(CustomerService);
  router = inject(Router);
  @Output() customerAdded = new EventEmitter<void>();
  @ViewChild('toast', { static: true })
  toast!: ElementRef; toastMessage: string = '';
  @Input() isEditMode = false;
  @Input() customerData: any = null;

  customerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [''],
    mobile: ['', [Validators.required, Validators.maxLength(10)]],
    address: ['', Validators.required],
    Dist: ['', Validators.required],
    Taluka: ['', Validators.required],
    Village: [''],
    pin: ['']
  });

  ngOnChanges(changes: SimpleChanges): void {

    if (this.isEditMode && this.customerData) {
      this.customerForm.patchValue(this.customerData);
    } else {
      this.customerForm.reset();
    }
  }

  addCustomer() {
    if (this.customerForm.invalid) {
      this.toastMessage = "please provide all fields with valid data !";
      this.showToast();
      return;
    }
    if (this.isEditMode && this.customerData) {
      const model: Customer = this.customerForm.value;
      this.customerService.updateCustomer(this.customerData._id,model).subscribe(res => {
        this.toastMessage = 'Customer record updated successfully!';
        this.showToast();
        this.customerAdded.emit();
        this.customerForm.reset();
      });;
    }
    else {
      const model: Customer = this.customerForm.value;
      this.customerService.addCustomer(model).subscribe(res => {
        this.toastMessage = 'Customer record saved successfully!';
        this.showToast();
        this.customerAdded.emit();
        this.customerForm.reset();
      });
    }

  }

  showToast() {
    const toastEl = this.toast.nativeElement;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}
