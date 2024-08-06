import { Routes } from '@angular/router';
import { PackageTrackerComponent } from './package-tracker/package-tracker.component';

export const routes: Routes = [
  { path: 'package-tracker', component: PackageTrackerComponent },
  { path: '', redirectTo: 'package-tracker', pathMatch: 'full' }
];