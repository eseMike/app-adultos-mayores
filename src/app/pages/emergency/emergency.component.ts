import { Component } from '@angular/core';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
})
export class EmergencyComponent {
  confirmCall(phone: string): void {
    const confirmAction = window.confirm(
      'Are you sure you want to call for help?',
    );

    if (confirmAction) {
      // Provide vibration feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      window.location.href = `tel:${phone}`;
    }
  }
}
