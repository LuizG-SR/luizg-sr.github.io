import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEscolaPage } from './home-escola.page';

const routes: Routes = [
  {
    path: '',
    component: HomeEscolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEscolaPageRoutingModule {}
