import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTreinadorPageRoutingModule } from './home-treinador-routing.module';

import { HomeTreinadorPage } from './home-treinador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTreinadorPageRoutingModule
  ],
  declarations: [HomeTreinadorPage]
})
export class HomeTreinadorPageModule {}
