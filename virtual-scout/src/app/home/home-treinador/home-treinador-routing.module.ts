import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTreinadorPage } from './home-treinador.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTreinadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTreinadorPageRoutingModule {}
