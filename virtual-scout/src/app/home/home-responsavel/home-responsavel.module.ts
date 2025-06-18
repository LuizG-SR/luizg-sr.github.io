import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeResponsavelPageRoutingModule } from './home-responsavel-routing.module';

import { HomeResponsavelPage } from './home-responsavel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeResponsavelPageRoutingModule
  ],
  declarations: [HomeResponsavelPage]
})
export class HomeResponsavelPageModule {}
