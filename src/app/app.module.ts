import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { VoiceComponent } from './pages/voice/voice.component';
import { EmergencyComponent } from './pages/emergency/emergency.component';
import { TravelComponent } from './pages/travel/travel.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

// Traducciones
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from './core/translate-loader.factory';
import { RegisterComponent } from './pages/register/register.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    VoiceComponent,
    EmergencyComponent,
    TravelComponent,
    ShopComponent,
    ContactsComponent,
    RegisterComponent,
    PreferencesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'es',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    // Idiomas disponibles
    this.translate.addLangs(['es', 'en', 'fr', 'de']);

    // Leer idioma guardado en localStorage o usar el navegador
    const savedLang = localStorage.getItem('appLang');
    const browserLang = this.translate.getBrowserLang() || 'es';
    const langToUse =
      savedLang ||
      (['es', 'en', 'fr', 'de'].includes(browserLang) ? browserLang : 'es');

    // Establecer idioma
    this.translate.setDefaultLang('es');
    this.translate.use(langToUse);

    // Guardar cambios de idioma automáticamente
    this.translate.onLangChange.subscribe((event) => {
      localStorage.setItem('appLang', event.lang);
    });
  }
}
