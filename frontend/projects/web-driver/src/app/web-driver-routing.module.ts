import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryViewComponent } from './delivery-view/delivery-view.component';

const routes: Routes = [
  { path: 'delivery', component: DeliveryViewComponent },
  { path: '', redirectTo: 'delivery', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WebDriverRoutingModule { }