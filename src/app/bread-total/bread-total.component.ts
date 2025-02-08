import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Sale from '../Data/sale';
import { SaleService } from '../services/sale.service';
import { FilterPipe } from "../pipes/filter.pipe";

@Component({
  selector: 'app-bread-total',
  standalone: true,
  imports: [FormsModule, FilterPipe],
  templateUrl: './bread-total.component.html',
  styleUrl: './bread-total.component.scss'
})
export class BreadTotalComponent {
  sale: any;
  saleService = inject(SaleService);
  searchText: string = '';
  MB: any;
  JF: any;
  PDR: any;
  HF: any;
  HFX: any;
  JB: any;
  JBX: any;
  KH: any;
  RK: any;
  GIR: any;
  SH: any;
  DN: any;

  SHEATH: any;
  GLOVES: any;
  goat: any;
  sorted: any;
  extraAIGloves: any;
  extraAISheeth: any;

  TotalQuantity: any;
  ngOnInit() {
    this.saleService.getSales().subscribe(res => {
      this.sale = res;
      this.MB = this.sale.reduce((accumulator: any, element: { MB: any; }) => {
        return accumulator + element.MB;
      }, 0);

      this.JF = this.sale.reduce((accumulator: any, element: { JF: any; }) => {
        return accumulator + element.JF;
      }, 0);

      this.PDR = this.sale.reduce((accumulator: any, element: { PDR: any; }) => {
        return accumulator + element.PDR;
      }, 0);

      this.HF = this.sale.reduce((accumulator: any, element: { HF: any; }) => {
        return accumulator + element.HF;
      }, 0);

      this.HFX = this.sale.reduce((accumulator: any, element: { HFX: any; }) => {
        return accumulator + element.HFX;
      }, 0);

      this.JB = this.sale.reduce((accumulator: any, element: { JB: any; }) => {
        return accumulator + element.JB;
      }, 0);

      this.JBX = this.sale.reduce((accumulator: any, element: { JBX: any; }) => {
        return accumulator + element.JBX;
      }, 0);

      this.KH = this.sale.reduce((accumulator: any, element: { KH: any; }) => {
        return accumulator + element.KH;
      }, 0);

      this.RK = this.sale.reduce((accumulator: any, element: { RK: any; }) => {
        return accumulator + element.RK;
      }, 0);

      this.GIR = this.sale.reduce((accumulator: any, element: { GIR: any; }) => {
        return accumulator + element.GIR;
      }, 0);

      this.SH = this.sale.reduce((accumulator: any, element: { SH: any; }) => {
        return accumulator + element.SH;
      }, 0);

      this.DN = this.sale.reduce((accumulator: any, element: { DN: any; }) => {
        return accumulator + element.DN;
      }, 0);

      ///
      const SHEATH = this.sale.reduce((accumulator: any, element: { SHEATH: any; }) => {
        return accumulator + element.SHEATH;
      }, 0);

      const GLOVES = this.sale.reduce((accumulator: any, element: { GLOVES: any; }) => {
        return accumulator + element.GLOVES;
      }, 0);

      this.goat = this.sale.reduce((accumulator: any, element: { goat: any; }) => {
        return accumulator + element.goat;
      }, 0);

      this.sorted = this.sale.reduce((accumulator: any, element: { sorted: any; }) => {
        return accumulator + element.sorted;
      }, 0);

      this.extraAIGloves = this.sale.reduce((accumulator: any, element: { extraAIGloves: any; }) => {
        return accumulator + element.extraAIGloves;
      }, 0);

      this.extraAISheeth = this.sale.reduce((accumulator: any, element: { extraAISheeth: any; }) => {
        return accumulator + element.extraAISheeth;
      }, 0);

      this.SHEATH = SHEATH + this.extraAISheeth;
      this.GLOVES = GLOVES + this.extraAIGloves;

      this.TotalQuantity = this.MB + this.JF + this.PDR + this.HF + this.HFX + this.JB + this.JBX + this.KH + this.RK +
        this.GIR + this.SH + this.DN + this.SHEATH + this.GLOVES + this.goat + this.sorted;

    })
  }

  change(event: any) {
    const data = this.sale.filter((e: { billDate: string; }) => e.billDate == this.searchText + 'T00:00:00.000Z');
    this.MB = data.reduce((accumulator: any, element: { MB: any; }) => {
      return accumulator + element.MB;
    }, 0);

    this.JF = data.reduce((accumulator: any, element: { JF: any; }) => {
      return accumulator + element.JF;
    }, 0);

    this.PDR = data.reduce((accumulator: any, element: { PDR: any; }) => {
      return accumulator + element.PDR;
    }, 0);

    this.HF = data.reduce((accumulator: any, element: { HF: any; }) => {
      return accumulator + element.HF;
    }, 0);

    this.HFX = data.reduce((accumulator: any, element: { HFX: any; }) => {
      return accumulator + element.HFX;
    }, 0);

    this.JB = data.reduce((accumulator: any, element: { JB: any; }) => {
      return accumulator + element.JB;
    }, 0);

    this.JBX = data.reduce((accumulator: any, element: { JBX: any; }) => {
      return accumulator + element.JBX;
    }, 0);

    this.KH = data.reduce((accumulator: any, element: { KH: any; }) => {
      return accumulator + element.KH;
    }, 0);

    this.RK = data.reduce((accumulator: any, element: { RK: any; }) => {
      return accumulator + element.RK;
    }, 0);

    this.GIR = data.reduce((accumulator: any, element: { GIR: any; }) => {
      return accumulator + element.GIR;
    }, 0);

    this.SH = data.reduce((accumulator: any, element: { SH: any; }) => {
      return accumulator + element.SH;
    }, 0);

    this.DN = data.reduce((accumulator: any, element: { DN: any; }) => {
      return accumulator + element.DN;
    }, 0);
    ////

    const SHEATH = data.reduce((accumulator: any, element: { SHEATH: any; }) => {
      return accumulator + element.SHEATH;
    }, 0);

    const GLOVES = data.reduce((accumulator: any, element: { GLOVES: any; }) => {
      return accumulator + element.GLOVES;
    }, 0);

    this.goat = data.reduce((accumulator: any, element: { goat: any; }) => {
      return accumulator + element.goat;
    }, 0);

    this.sorted = data.reduce((accumulator: any, element: { sorted: any; }) => {
      return accumulator + element.sorted;
    }, 0);

    this.extraAIGloves = data.reduce((accumulator: any, element: { extraAIGloves: any; }) => {
      return accumulator + element.extraAIGloves;
    }, 0);

    this.extraAISheeth = data.reduce((accumulator: any, element: { extraAISheeth: any; }) => {
      return accumulator + element.extraAISheeth;
    }, 0);

    this.SHEATH = SHEATH + this.extraAISheeth;
    this.GLOVES = GLOVES + this.extraAIGloves;
    this.TotalQuantity = this.MB + this.JF + this.PDR + this.HF + this.HFX + this.JB + this.JBX + this.KH + this.RK +
      this.GIR + this.SH + this.DN + this.SHEATH + this.GLOVES + this.goat + this.sorted;
  }
}
