import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  login() {
    if (!this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    this.userService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (res: any) => {
          console.log('Login correcto:', res);

          // Guardar usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(res.usuario));

          // Redirigir al home
          this.router.navigate(['']);
        },
        (err: any) => {
          console.error(err);
          alert(err.error?.message || 'Error al iniciar sesión');
        },
      );
  }
}
