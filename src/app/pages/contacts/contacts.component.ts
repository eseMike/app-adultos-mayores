import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contactos: { nombre: string; telefono: string }[] = [];

  mostrarFormulario: boolean = false;
  nuevoNombre: string = '';
  nuevoTelefono: string = '';
  editandoIndex: number | null = null;

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (!usuarioGuardado) return;

    try {
      const usuario = JSON.parse(usuarioGuardado);
      const contactos = Array.isArray(usuario.contactos)
        ? usuario.contactos
        : [];

      this.contactos = contactos.filter((c: any) => c?.nombre && c?.telefono);
    } catch (error) {
      console.error('Error leyendo contactos', error);
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  guardarContacto() {
    if (!this.nuevoNombre.trim() || !this.nuevoTelefono.trim()) {
      alert('Completa nombre y teléfono');
      return;
    }

    const nuevo = {
      nombre: this.nuevoNombre,
      telefono: this.nuevoTelefono,
    };

    if (this.editandoIndex !== null) {
      this.contactos[this.editandoIndex] = nuevo;
    } else {
      this.contactos.push(nuevo);
    }

    // actualizar localStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      usuario.contactos = this.contactos;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    this.editandoIndex = null;
    // limpiar formulario
    this.nuevoNombre = '';
    this.nuevoTelefono = '';
    this.mostrarFormulario = false;
  }

  editarContacto(contacto: { nombre: string; telefono: string }) {
    const index = this.contactos.findIndex((c) => c === contacto);

    if (index === -1) return;

    this.editandoIndex = index;
    this.nuevoNombre = contacto.nombre;
    this.nuevoTelefono = contacto.telefono;
    this.mostrarFormulario = true;
  }

  eliminarContacto(contacto: { nombre: string; telefono: string }) {
    const confirmacion = confirm('¿Eliminar este contacto?');
    if (!confirmacion) return;

    const index = this.contactos.findIndex((c) => c === contacto);
    if (index === -1) return;

    this.contactos.splice(index, 1);

    // actualizar localStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      usuario.contactos = this.contactos;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  callContact(phone: string) {
    window.location.href = 'tel:' + phone;
  }

  messageContact(phone: string) {
    window.location.href = 'sms:' + phone;
  }
}
