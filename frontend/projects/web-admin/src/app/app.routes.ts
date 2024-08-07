import { Routes } from '@angular/router';

//import { PackageFormComponent } from './package-form/package-form.component';
//import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { CreatePackageComponent } from './components/create-package/create-package.component';
import { CreateDeliveryComponent } from './components/create-delivery/create-delivery.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { ListDeliveriesComponent } from './components/list-deliveries/list-deliveries.component';


export const routes: Routes = [
  { path: 'create-package', component: CreatePackageComponent },
  { path: 'create-delivery', component: CreateDeliveryComponent },
  { path: 'list-packages', component: ListPackagesComponent },
  { path: 'list-deliveries', component: ListDeliveriesComponent },
  { path: '', redirectTo: '/create-package', pathMatch: 'full' }
];
