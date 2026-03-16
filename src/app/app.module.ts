import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { VoiceComponent } from './pages/voice/voice.component';
import { EmergencyComponent } from './pages/emergency/emergency.component';
import { TravelComponent } from './pages/travel/travel.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

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
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
