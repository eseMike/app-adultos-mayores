import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { VoiceComponent } from './pages/voice/voice.component';
import { EmergencyComponent } from './pages/emergency/emergency.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TravelComponent } from './pages/travel/travel.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'voice', component: VoiceComponent },
  { path: 'emergency', component: EmergencyComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'shop', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
