import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeReportsComponent } from '.';

const appRoutes: Routes = [
  {
    path: 'reports',
    component: HomeReportsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeReportsRoutingModule {}
