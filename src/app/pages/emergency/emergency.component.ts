import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
})
export class EmergencyComponent implements OnInit {
  contactos: { nombre: string; telefono: string }[] = [];
  contactoPrincipal: { nombre: string; telefono: string } | null = null;
  otrosContactos: { nombre: string; telefono: string }[] = [];

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) return;

    try {
      const usuario = JSON.parse(usuarioGuardado);
      const contactos = Array.isArray(usuario.contactos)
        ? usuario.contactos
        : [];

      this.contactos = contactos.filter((c: any) => c?.nombre && c?.telefono);

      if (this.contactos.length > 0) {
        this.contactoPrincipal = this.contactos[0];
        this.otrosContactos = this.contactos;
      }
    } catch (error) {
      console.error('Error leyendo contactos del usuario', error);
    }
  }

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
