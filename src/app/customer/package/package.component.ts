import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { PackageService } from '../../services/package.service';
import Package from '../../Data/package';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JavaScript functions

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
        ReactiveFormsModule,
        FilterPipe,
        FormsModule
  ],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  fb = inject(FormBuilder);
  packageService = inject(PackageService);
  packages: Package[] = [];
  isEditMode = false; // Change this as required
  @ViewChild('toast', { static: true })
  toast!: ElementRef; toastMessage: string = '';
  searchText: string = '';
  packageId: string = '';

  ngOnInit() {
    this.loadPackage();
  }

    packageForm: FormGroup = this.fb.group({
      packageAmount: [null, Validators.required],
      min: [null],
      max: [null]
    });

    loadPackage() {
      this.packageService.getPackage().subscribe((result) => {
        this.packages = result;
        console.log('products', this.packages)
      });
    }

      addPackage() {
        if (this.packageForm.invalid) {
          this.toastMessage = "please provide all fields with valid data !";
          this.showToast();
          return;
        }
        if (this.isEditMode && this.packageForm) {
          const model: Package = this.packageForm.value;
          this.packageService.updatePackage(this.packageId, model).subscribe(res => {
            this.toastMessage = 'Package record updated successfully!';
            this.showToast();
            this.packageForm.reset();
            this.loadPackage();
            this.isEditMode = false;
          });
        }
        else {
          const model: Package = this.packageForm.value;
          this.packageService.addPackage(model).subscribe(res => {
            this.toastMessage = 'Package record saved successfully!';
            this.showToast();
            this.packageForm.reset();
            this.loadPackage();
          });
        }
    
      }
    
      showToast() {
        const toastEl = this.toast.nativeElement;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
      }

      editPackage(pack: any) {
        console.log('selected customer data', pack)
        this.isEditMode = true;
        this.packageForm.patchValue(pack);
        this.packageId = pack._id;
      }
    
      deletePackage(id: string) {
        const ok = confirm("are you sure want to delete package ?");
        if (ok) {
          this.packageService.deletePackage(id).subscribe(res => {
            this.packages = this.packages.filter((c) => c._id != id);
            this.toastMessage = 'Package record deleted successfully!';
            this.showToast();
          })
        }
      }
}
