import { Component } from '@angular/core';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
})
export class TravelComponent {
  contactos: { nombre: string; telefono: string }[] = [];

  hasLocation: boolean = false;
  locationStatus: string = 'Obteniendo ubicación...';

  constructor() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.contactos = usuario.contactos || [];
    }
  }

  private getCurrentPosition(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        this.hasLocation = false;
        this.locationStatus = 'Ubicación no disponible';
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.hasLocation = true;
          this.locationStatus = 'Usando tu ubicación actual';
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          this.hasLocation = false;
          this.locationStatus = 'No se pudo obtener ubicación';
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 5000 },
      );
    });
  }

  async openUber() {
    const coords = await this.getCurrentPosition();
    const base = 'https://m.uber.com/ul/?action=setPickup';

    let url = base;
    if (coords) {
      url += `&pickup[latitude]=${coords.lat}&pickup[longitude]=${coords.lng}`;
    } else {
      url += '&pickup=my_location';
    }

    // Try open Uber deep link; fallback to Maps if it fails
    window.location.href = url;
  }

  async openTaxi() {
    const coords = await this.getCurrentPosition();

    let url = 'https://www.google.com/maps/search/?api=1&query=taxi';
    if (coords) {
      url = `https://www.google.com/maps/search/?api=1&query=taxi&query_place_id=&center=${coords.lat},${coords.lng}`;
    }

    window.open(url, '_blank');
  }

  callFamily() {
    if (!this.contactos.length) {
      alert('No tienes contactos guardados');
      return;
    }

    const contacto = this.contactos[0];

    const confirmed = window.confirm(`¿Deseas llamar a ${contacto.nombre}?`);

    if (confirmed) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      window.location.href = 'tel:' + contacto.telefono;
    }
  }
}
