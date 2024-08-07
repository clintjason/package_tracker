import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { CreatePackageComponent } from './components/create-package/create-package.component';
import { CreateDeliveryComponent } from './components/create-delivery/create-delivery.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { ListDeliveriesComponent } from './components/list-deliveries/list-deliveries.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePackageComponent,
    CreateDeliveryComponent,
    ListPackagesComponent,
    ListDeliveriesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }