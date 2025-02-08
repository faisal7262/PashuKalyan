import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  navigateToSale() {
    this.router.navigate(['/sale']);
  }

  navigateToSalesReport() {
    this.router.navigate(['/sales-report']);
  }

  navigateToBreadReport() {
    this.router.navigate(['/bread']);
  }
}
