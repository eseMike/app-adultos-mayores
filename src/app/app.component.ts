import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app-adultos-mayores';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Leer idioma guardado en localStorage o usar español por defecto
    const savedLang = localStorage.getItem('appLang') || 'es';
    this.translate.setDefaultLang('es');
    this.translate.use(savedLang);
  }
}
