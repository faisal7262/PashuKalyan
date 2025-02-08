import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-bill-print-only',
  standalone: true,
  imports: [],
  templateUrl: './bill-print-only.component.html',
  styleUrl: './bill-print-only.component.scss'
})
export class BillPrintOnlyComponent {
  bill = {
    date: new Date().toLocaleDateString(),
    customerName: 'John Doe',
    items: [
      { name: 'Item 1', quantity: 2, price: 50, total: 100 },
      { name: 'Item 2', quantity: 1, price: 30, total: 30 }
    ],
    totalAmount: 130
  };
  saleData:any;
  saleId:any;
  billDate:any;
  customerName:any;
  billNo:any;
  constructor(private router: Router,private route: ActivatedRoute, private saleService:SaleService) {
    this.route.params.subscribe(params => {
      this.saleId = params['saleId'];
    });
    this.saleService.getSale(this.saleId).subscribe(res => {
      this.saleData = res;
      this.billDate = this.saleData.billDate.split('T')[0];
      this.customerName = this.saleData.customerName;
      this.billNo = this.saleData.billNo;
    })
  }

  printBill() {
    const printContent = document.getElementById('print-section')!.innerHTML;
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt!.document.write(printContent);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    WindowPrt!.close();
    this.router.navigate(['/sales-report'])
  }
}
