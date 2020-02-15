import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { HomeReportsModule } from './reports/reports.module';

import { ApiService, NavigationService, UserService } from '../shared/services';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HomeReportsModule,
    HomeRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    ApiService,
    NavigationService,
    UserService
  ],
  bootstrap: [
    HomeComponent
  ]
})
export class HomeModule {}
