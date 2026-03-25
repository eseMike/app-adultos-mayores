import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const userId = usuarioGuardado ? JSON.parse(usuarioGuardado)._id : null;

    if (!userId) return;

    this.http.get(`http://localhost:3000/api/users/${userId}`).subscribe({
      next: (res: any) => {
        const prefs = res?.preferencias;

        if (prefs) {
          this.transporte = !!prefs.transporte;
          this.mandados = !!prefs.mandados;
        }
      },
      error: (err) => {
        console.error('Error cargando preferencias', err);
      },
    });
  }

  transporte: boolean = false;
  mandados: boolean = false;

  continuar() {
    const preferencias = {
      transporte: this.transporte,
      mandados: this.mandados,
    };

    console.log('Preferencias seleccionadas:', preferencias);

    const usuarioGuardado = localStorage.getItem('usuario');
    const userId = usuarioGuardado ? JSON.parse(usuarioGuardado)._id : null;

    if (!userId) {
      alert('Error: usuario no identificado');
      return;
    }

    this.http
      .put(`http://localhost:3000/api/users/preferences/${userId}`, {
        preferencias,
      })
      .subscribe({
        next: (res: any) => {
          alert('Preferencias guardadas correctamente');
          console.log(res);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error(err);
          alert('Error al guardar preferencias');
        },
      });
  }
}
