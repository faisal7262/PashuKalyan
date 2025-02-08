import { Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { SaleComponent } from './sale/sale.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { BillPrintOnlyComponent } from './bill-print-only/bill-print-only.component';
import { BreadTotalComponent } from './bread-total/bread-total.component';

export const routes: Routes = [
    {
        path: "",
        component: CustomerComponent
    },
    {
        path: "customer",
        component: CustomerComponent
    },
    {
        path: "customer/add",
        component: AddCustomerComponent
    },
    {
        path: "sale",
        component: SaleComponent
    },
    {
        path: "sales-report",
        component: SalesReportComponent
    },
    { path: 'sale/:saleId/:isEditMode', component: SaleComponent },  // Ensure this route matches
    { path: 'print/:saleId', component: BillPrintOnlyComponent },
    { path: 'bread', component: BreadTotalComponent },

];
