// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePackageComponent } from './components/create-package/create-package.component';
import { CreateDeliveryComponent } from './components/create-delivery/create-delivery.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { ListDeliveriesComponent } from './components/list-deliveries/list-deliveries.component';

const routes: Routes = [
  { path: 'create-package', component: CreatePackageComponent },
  { path: 'create-delivery', component: CreateDeliveryComponent },
  { path: 'list-packages', component: ListPackagesComponent },
  { path: 'list-deliveries', component: ListDeliveriesComponent },
  { path: '', redirectTo: '/create-package', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }