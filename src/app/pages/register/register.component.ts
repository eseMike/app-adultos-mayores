import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  nombre: string = '';
  email: string = '';
  password: string = '';

  contactos: { nombre: string; telefono: string }[] = [
    { nombre: '', telefono: '' },
    { nombre: '', telefono: '' },
  ];

  agregarContacto() {
    this.contactos.push({ nombre: '', telefono: '' });
  }

  continuar() {
    // Validar nombre
    if (!this.nombre || this.nombre.trim() === '') {
      alert('Por favor ingresa tu nombre');
      return;
    }

    if (!this.email || this.email.trim() === '') {
      alert('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!this.password || this.password.trim() === '') {
      alert('Por favor crea una contraseña');
      return;
    }

    // Validar que al menos un contacto tenga datos
    const contactosValidos = this.contactos.filter(
      (c) => c.nombre.trim() !== '' && c.telefono.trim() !== '',
    );

    if (contactosValidos.length === 0) {
      alert('Agrega al menos un contacto de emergencia válido');
      return;
    }

    this.userService
      .registerUser({
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        contactos: contactosValidos,
      })
      .subscribe({
        next: (res: any) => {
          alert('Usuario registrado correctamente');
          console.log(res);

          // Guardar usuario completo
          if (res && res._id) {
            localStorage.setItem('usuario', JSON.stringify(res));
          }

          // Limpiar formulario
          this.nombre = '';
          this.email = '';
          this.password = '';
          this.contactos = [
            { nombre: '', telefono: '' },
            { nombre: '', telefono: '' },
          ];

          // Ir a preferencias
          this.router.navigate(['/preferences']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar usuario');
        },
      });
  }
}
