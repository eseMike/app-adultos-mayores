import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  orderGroceries() {
    window.open('https://www.walmart.com', '_blank');
  }

  orderMedicine() {
    window.open('https://www.walgreens.com', '_blank');
  }

  orderDailyNeeds() {
    window.open('https://www.amazon.com', '_blank');
  }

  callFamily() {
    if (window.confirm('¿Está seguro que desea llamar a este familiar?')) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      window.location.href = 'tel:+1234567890';
    }
  }
}
