import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';
import { PackageTrackerComponent } from './package-tracker/package-tracker.component';
import { WebTrackerRoutingModule } from './web-tracker-routing.module';

@NgModule({
  declarations: [
    //AppComponent,
    PackageTrackerComponent
  ],
  imports: [
    //CommonModule,
    AppComponent,
    BrowserModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    WebTrackerRoutingModule
  ],
  //bootstrap: [AppComponent]
})
export class WebTrackerModule { }
