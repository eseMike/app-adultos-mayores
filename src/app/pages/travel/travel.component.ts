import { Component } from '@angular/core';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent {
  callFamily(phone: string) {
    const confirmed = window.confirm(
      '¿Está seguro que desea llamar a este familiar?',
    );
    if (confirmed) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      window.location.href = 'tel:' + phone;
    }
  }
}
