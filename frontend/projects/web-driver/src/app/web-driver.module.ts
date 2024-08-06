import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { WebDriverRoutingModule } from './web-driver-routing.module';
import { AppComponent } from './app.component';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';


@NgModule({
  declarations: [ DeliveryViewComponent],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
  ],
  //bootstrap: [AppComponent]
})
export class WebDriverModule { }