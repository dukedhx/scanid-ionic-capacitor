import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scanid',
    pathMatch: 'full',
  },
  // {
  //   path: 'smilycam',
  //   loadChildren: () =>
  //     import('./smilycam/smilycam.module').then((m) => m.SmilycamPageModule),
  // },
  {
    path: 'scanid',
    loadChildren: () => import('./scanid/scanid.module').then( m => m.ScanidPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
