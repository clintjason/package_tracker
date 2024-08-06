import { Routes } from '@angular/router';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';

export const routes: Routes = [
  { path: 'delivery', component: DeliveryViewComponent },
  { path: '', redirectTo: 'delivery', pathMatch: 'full' },
];
