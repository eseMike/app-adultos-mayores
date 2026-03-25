import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  contactos: { nombre: string; telefono: string }[] = [];
  favoritos: { nombre: string; url: string }[] = [];

  constructor() {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.contactos = usuario.contactos || [];
    }
    const favGuardados = localStorage.getItem('favoritos');
    if (favGuardados) {
      this.favoritos = JSON.parse(favGuardados);
    }
  }

  orderGroceries() {
    const url = 'https://www.walmart.com.mx';
    this.guardarFavorito('Walmart', url);
    window.open(url, '_blank');
  }

  orderMedicine() {
    const url = 'https://www.farmaciasguadalajara.com';
    this.guardarFavorito('Farmacias Guadalajara', url);
    window.open(url, '_blank');
  }

  orderDailyNeeds() {
    const url = 'https://www.amazon.com.mx';
    this.guardarFavorito('Amazon', url);
    window.open(url, '_blank');
  }

  guardarFavorito(nombre: string, url: string) {
    const existe = this.favoritos.find((f) => f.url === url);
    if (existe) return;

    this.favoritos.push({ nombre, url });
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  abrirFavorito(url: string) {
    window.open(url, '_blank');
  }

  callFamily() {
    if (!this.contactos.length) {
      alert('No tienes contactos guardados');
      return;
    }

    const contacto = this.contactos[0];

    const confirmed = window.confirm(`¿Deseas llamar a ${contacto.nombre}?`);
    if (!confirmed) return;

    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    window.location.href = 'tel:' + contacto.telefono;
  }
}
