import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import Customer from '../Data/customer';
import Sale from '../Data/sale';
import { SaleService } from '../services/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any; // Declare bootstrap to use Bootstrap's JavaScript functions

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  fb = inject(FormBuilder);
  customerService = inject(CustomerService);
  customers: Customer[] = [];
  sale: Sale[] = [];
  customer: any;
  lastBillNumber: number = 1000; // Starting bill number, adjust as needed
  saleService = inject(SaleService);
  isEditMode: boolean = false; // Change this as required
  saleId: string = '';
  route = inject(ActivatedRoute);
  router = inject(Router);
  @ViewChild('toast', { static: true })
  toast!: ElementRef; toastMessage: string = '';
  saleData: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.saleId = params['saleId'];
      this.isEditMode = params['isEditMode'];
    });
    console.log('call', this.saleId + '---------' + this.isEditMode)

    if (this.saleId && this.isEditMode) {
      console.log('call', this.saleId + '---------' + this.isEditMode)
      this.saleService.getSale(this.saleId).subscribe(res => {

        this.saleData = res;
        console.log(this.saleData)
        const datebill = this.saleData.billDate;
        console.log('datebill', datebill)
        this.saleData.billDate = datebill.split('T')[0];
        console.log(this.saleData)
        console.log('Form Before Patch:', this.saleForm.value);
        this.saleForm.patchValue(this.saleData);
        console.log('Form After Patch:', this.saleForm.value);
      });
    }
    this.getCustomers();
    this.getSales();
  }

  saleForm: FormGroup = this.fb.group({
    billNo: [0, Validators.required],
    lot: [0, Validators.required],
    startDate: [null, Validators.required],
    billDate: [null, Validators.required],
    village: [''],
    customerName: ['', Validators.required],
    mobileNo: ['', Validators.required],
    MB: [0],
    JF: [0],
    PDR: [0],
    HF: [0],
    HFX: [0],
    JB: [0],
    JBX: [0],
    KH: [0],
    RK: [0],
    GIR: [0],
    SH: [0],
    DN: [0],
    SHEATH: [0],
    GLOVES: [0],
    totalPackageDose: [0],
    packageAmount: [0],
    goat: [0],
    goatAmount: [0],
    totalGoat: [0],
    sorted: [0],
    sortedAmount: [0],
    totalsorted: [0],
    extraFSD: [0],
    FSDAmount: [0],
    totalFSD: [0],
    extraAIGloves: [0],
    AIGlovesAmount: [0],
    totalAIGloves: [0],
    extraAISheeth: [0],
    AISheethAmount: [0],
    totalAISheeth: [0],
    LN2: [0],
    LN2Amount: [0],
    TotalLN2Amount: [0],
    extraAmount: [0],
    total: [0],
    gstPer: [0],
    gstAmount: [0],
    finalTotal: [0]
  });

  getSales() {
    if (!this.saleId) {
      this.saleService.getSales().subscribe(res => {
        const billNO = res.reduce((prev, current) => {
          return (prev.billNo > current.billNo) ? prev : current;
        }, res[0]);

        let bill = billNO.billNo + 1;
        this.saleForm.get('billNo')?.setValue(bill);
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Adding leading zero
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding leading zero
        const year = today.getFullYear();
        const formattedDate = `${year}-${month}-${day}`; // Format: YYYY-MM-DD
        console.log('formatted date', formattedDate);
        this.saleForm.get('billDate')?.setValue(formattedDate);
      })
    }
  }

  getCustomers() {
    this.customerService.getCustomer().subscribe((res) => {
      this.customers = res;
      console.log(this.customers);
    });
  }


  fullname: any;
  Village: any;
  mobile: any;
  changeCustomer(e: any) {
    console.log(e.target.value)
    this.customer = this.customers.find((cust) => cust._id == e.target.value);
    this.fullname = this.customer.firstName + ' ' + this.customer.lastName;
    this.mobile = this.customer.mobile;
    this.Village = this.customer.Village;
    console.log(this.customer);
  }

  totalfsd() {
    let fsd = this.saleForm.get('extraFSD')?.value || 0;
    let FSDAmount = this.saleForm.get('FSDAmount')?.value || 0;
    let totalfsd = fsd * FSDAmount;
    this.saleForm.get('totalFSD')?.setValue(totalfsd);
  }

  totalgloves() {
    let gloves = this.saleForm.get('extraAIGloves')?.value || 0;
    let glovesAmount = this.saleForm.get('AIGlovesAmount')?.value || 0;
    let total = gloves * glovesAmount;
    this.saleForm.get('totalAIGloves')?.setValue(total);
  }

  totalSheath() {
    let sheath = this.saleForm.get('extraAISheeth')?.value || 0;
    let sheathAmount = this.saleForm.get('AISheethAmount')?.value || 0;
    let total = sheath * sheathAmount;
    this.saleForm.get('totalAISheeth')?.setValue(total);
  }

  ln2Amount() {
    let ln2 = this.saleForm.get('LN2')?.value || 0;
    let ln2Amount = this.saleForm.get('LN2Amount')?.value || 0;
    let total = ln2 * ln2Amount;
    this.saleForm.get('TotalLN2Amount')?.setValue(total);
  }
  totalgoat() {
    let goat = this.saleForm.get('goat')?.value || 0;
    let goatAmount = this.saleForm.get('goatAmount')?.value || 0;
    let total = goat * goatAmount;
    this.saleForm.get('totalGoat')?.setValue(total);
  }
  totalsorted() {
    let sorted = this.saleForm.get('sorted')?.value || 0;
    let sortedAmount = this.saleForm.get('sortedAmount')?.value || 0;
    let total = sorted * sortedAmount;
    this.saleForm.get('totalsorted')?.setValue(total);
  }

  onOnlinePaymentChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log('Online Payment:', inputElement.checked);
    let isOnlinePayment = inputElement.checked;
    if (isOnlinePayment) {
      this.withGST()
      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    } else {
      this.withoutGST();
    }

  }

  withoutGST() {
    this.saleForm.get('gstPer')?.setValue(0);
    let packageAmount = this.saleForm.get('packageAmount')?.value || 0;
    let totalFSD = this.saleForm.get('totalFSD')?.value || 0;
    let totalAIGloves = this.saleForm.get('totalAIGloves')?.value || 0;
    let totalAISheeth = this.saleForm.get('totalAISheeth')?.value || 0;
    let TotalLN2Amount = this.saleForm.get('TotalLN2Amount')?.value || 0;
    let TotalGoatAmount = this.saleForm.get('totalGoat')?.value || 0;
    let TotalSortedAmount = this.saleForm.get('totalsorted')?.value || 0;
    let Extamount = TotalGoatAmount + TotalSortedAmount + totalFSD + totalAIGloves + totalAISheeth + TotalLN2Amount;
    this.saleForm.get('extraAmount')?.setValue(Extamount);
    let amount = packageAmount + Extamount;
    this.saleForm.get('total')?.setValue(amount);
    this.saleForm.get('gstAmount')?.setValue(0);
    this.saleForm.get('finalTotal')?.setValue(0);


  }
  finalTotal: any
  withGST() {
    this.saleForm.get('gstPer')?.setValue(18);
    let total = this.saleForm.get('total')?.value || 0;
    let gstPer = this.saleForm.get('gstPer')?.value || 0;
    let gstCalc = (total * gstPer) / 100;
    this.saleForm.get('gstAmount')?.setValue(gstCalc);
    let gstAmount = this.saleForm.get('gstAmount')?.value || 0;
    let finalTotal = total + gstAmount;
    finalTotal = Math.round(finalTotal * 100) / 100;
    this.saleForm.get('finalTotal')?.setValue(finalTotal);
    this.finalTotal = this.saleForm.get('finalTotal')?.value || 0;
  }

  calc() {
    this.withoutGST();
  }

  save() {
    if (this.saleId && this.isEditMode) {
      const model: Sale = this.saleForm.value;
      this.saleService.updateSale(this.saleId, model).subscribe(res => {
        this.toastMessage = 'Bill saved successfully!';
        this.showToast();
        this.router.navigate(['/print', this.saleId])
      });
    } else {
      const model: Sale = this.saleForm.value;
      this.saleService.addSale(model).subscribe(res => {
        this.toastMessage = 'Requirement details saved successfully!';
        this.saleForm.reset();
        this.showToast();
        this.getSales();
      });
    }
  }

  showToast() {
    const toastEl = this.toast.nativeElement;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

}

