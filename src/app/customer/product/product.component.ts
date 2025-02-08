import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Product from '../../Data/product';
import { ProductService } from '../../services/product.service';
import { FilterPipe } from "../../pipes/filter.pipe";
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JavaScript functions

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FilterPipe,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  fb = inject(FormBuilder);
  productService = inject(ProductService);
  products: Product[] = [];
  isEditMode = false; // Change this as required
  @ViewChild('toast', { static: true })
  toast!: ElementRef; toastMessage: string = '';
  searchText: string = '';
  productId: string = '';

  ngOnInit() {
    this.loadProduct();
  }

  productForm: FormGroup = this.fb.group({
    productName: ['', Validators.required],
    min: [null],
    max: [null]
  });

  loadProduct() {
    this.productService.getProduct().subscribe((result) => {
      this.products = result;
    });
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.toastMessage = "please provide all fields with valid data !";
      this.showToast();
      return;
    }
    if (this.isEditMode && this.productForm) {
      const model: Product = this.productForm.value;
      this.productService.updateProduct(this.productId, model).subscribe(res => {
        this.toastMessage = 'Product record updated successfully!';
        this.showToast();
        this.productForm.reset();
        this.loadProduct();
        this.isEditMode = false;
      });
    }
    else {
      const model: Product = this.productForm.value;
      this.productService.addProduct(model).subscribe(res => {
        this.toastMessage = 'Product record saved successfully!';
        this.showToast();
        this.productForm.reset();
        this.loadProduct();
      });
    }

  }

  showToast() {
    const toastEl = this.toast.nativeElement;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  editProduct(product: any) {
    this.isEditMode = true;
    this.productForm.patchValue(product);
    this.productId = product._id;
  }

  deleteProduct(id: string) {
    const ok = confirm("are you sure want to delete product ?");
    if (ok) {
      this.productService.deleteProduct(id).subscribe(res => {
        this.products = this.products.filter((c) => c._id != id);
        this.toastMessage = 'Product record deleted successfully!';
        this.showToast();
      })
    }
  }

}
