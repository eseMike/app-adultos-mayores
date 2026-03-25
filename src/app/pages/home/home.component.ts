import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  nombre: string = '';
  preferencias: any = {};
  opciones: any[] = [];

  constructor(
    public translate: TranslateService,
    private http: HttpClient,
  ) {
    // Agregar los idiomas disponibles
    this.translate.addLangs(['en', 'es']);

    // Establecer el idioma por defecto
    this.translate.setDefaultLang('es');

    // Detectar idioma del navegador y usarlo si está soportado
    const browserLang = this.translate.getBrowserLang() || 'es';
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');
    const userId = usuarioGuardado ? JSON.parse(usuarioGuardado)._id : null;

    if (!userId) return;

    this.http
      .get(`http://localhost:3000/api/users/${userId}`)
      .subscribe((res: any) => {
        this.nombre = res.nombre;
        this.preferencias = res.preferencias || {};

        this.opciones = [];

        // Orden fijo por prioridad UX
        const orden = ['transporte', 'mandados'];

        orden.forEach((tipo) => {
          if (this.preferencias[tipo]) {
            this.opciones.push({ tipo });
          }
        });

        console.log('Usuario cargado:', res);
      });
  }

  logout() {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }
}
