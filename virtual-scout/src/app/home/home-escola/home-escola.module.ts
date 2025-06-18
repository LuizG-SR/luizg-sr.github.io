import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeEscolaPageRoutingModule } from './home-escola-routing.module';

import { HomeEscolaPage } from './home-escola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEscolaPageRoutingModule
  ],
  declarations: [HomeEscolaPage]
})
export class HomeEscolaPageModule {}
