import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  callContact(phone: string) {
    window.location.href = 'tel:' + phone;
  }

  messageContact(phone: string) {
    window.location.href = 'sms:' + phone;
  }
}
