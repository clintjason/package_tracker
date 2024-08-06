import { Routes } from '@angular/router';

import { PackageFormComponent } from './package-form/package-form.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';


export const routes: Routes = [
  { path: 'packages', component: PackageFormComponent },
  { path: 'deliveries', component: DeliveryFormComponent },
  { path: '', redirectTo: 'packages', pathMatch: 'full' },
];
