import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { VoiceComponent } from './pages/voice/voice.component';
import { EmergencyComponent } from './pages/emergency/emergency.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TravelComponent } from './pages/travel/travel.component';
import { ShopComponent } from './pages/shop/shop.component';
import { RegisterComponent } from './pages/register/register.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'voice', component: VoiceComponent, canActivate: [authGuard] },
  {
    path: 'emergency',
    component: EmergencyComponent,
    canActivate: [authGuard],
  },
  { path: 'contacts', component: ContactsComponent, canActivate: [authGuard] },
  { path: 'travel', component: TravelComponent, canActivate: [authGuard] },
  { path: 'shop', component: ShopComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'preferences',
    component: PreferencesComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
