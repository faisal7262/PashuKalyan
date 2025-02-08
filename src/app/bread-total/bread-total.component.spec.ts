import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadTotalComponent } from './bread-total.component';

describe('BreadTotalComponent', () => {
  let component: BreadTotalComponent;
  let fixture: ComponentFixture<BreadTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadTotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
