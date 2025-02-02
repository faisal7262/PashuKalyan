import { Component, inject } from '@angular/core';
import Sale from '../Data/sale';
import { SaleService } from '../services/sale.service';
import { FilterPipe } from "../pipes/filter.pipe";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [FilterPipe,FormsModule],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent {
  sale: Sale[] = [];
  saleService = inject(SaleService);
  searchText: string = '';
  saleId: string = '';
  isEditMode = false;
  router = inject(Router);
  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSales().subscribe((res) => {
      this.sale = res;
      console.log('sales',this.sale)
    })
  }
  editSale(pack: any) {
    console.log('selected customer data', pack)
    this.isEditMode = true;
    this.saleId = pack._id;
    this.router.navigate(['/sale',this.saleId,this.isEditMode])
  }

}
