import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanidPage } from './scanid.page';

const routes: Routes = [
  {
    path: '',
    component: ScanidPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanidPageRoutingModule {}
