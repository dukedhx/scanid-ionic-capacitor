import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmilycamPage } from './smilycam.page';

const routes: Routes = [
  {
    path: '',
    component: SmilycamPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmilycamPageRoutingModule {}
