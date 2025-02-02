import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPrintOnlyComponent } from './bill-print-only.component';

describe('BillPrintOnlyComponent', () => {
  let component: BillPrintOnlyComponent;
  let fixture: ComponentFixture<BillPrintOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillPrintOnlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillPrintOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
