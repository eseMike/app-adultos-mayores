import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  selectedLanguage: string = 'es';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('appLang') || 'es';
    this.selectedLanguage = savedLang;

    this.translate.addLangs(['es', 'en', 'fr', 'de']);
    this.translate.setDefaultLang('es');
    this.translate.use(savedLang);
  }

  changeLanguage(lang: string) {
    if (!['es', 'en', 'fr', 'de'].includes(lang)) return;

    this.selectedLanguage = lang;
    this.translate.use(lang).subscribe(() => {
      // Guardar la preferencia de idioma en localStorage después de aplicar
      localStorage.setItem('appLang', lang);
    });
  }
}
