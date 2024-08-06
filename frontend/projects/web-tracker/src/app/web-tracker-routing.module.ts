import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageTrackerComponent } from './package-tracker/package-tracker.component';

const routes: Routes = [
  { path: 'package-tracker', component: PackageTrackerComponent },
  { path: '', redirectTo: 'package-tracker', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WebTrackerRoutingModule { }