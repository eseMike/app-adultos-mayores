import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public translate: TranslateService) {
    // Agregar los idiomas disponibles
    this.translate.addLangs(['en', 'es']);

    // Establecer el idioma por defecto
    this.translate.setDefaultLang('es');

    // Detectar idioma del navegador y usarlo si está soportado
    const browserLang = this.translate.getBrowserLang() || 'es';
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }
}
