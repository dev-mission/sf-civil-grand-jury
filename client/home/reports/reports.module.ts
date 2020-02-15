import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../shared/components';
import { SharedPipesModule } from '../../shared/pipes';

import { HomeReportsRoutingModule } from './reports-routing.module';
import { HomeReportsComponent } from '.';

@NgModule({
  declarations: [
    HomeReportsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    HomeReportsRoutingModule,
  ],
  providers: []
})
export class HomeReportsModule {}
