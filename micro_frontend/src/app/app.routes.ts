import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebTrackerComponent } from './components/web-tracker/web-tracker.component';
import { WebDriverComponent } from './components/web-driver/web-driver.component';
import { WebAdminComponent } from './components/web-admin/web-admin.component';

export const routes: Routes = [
  { path: 'web-tracker', component: WebTrackerComponent },
  { path: 'web-driver', component: WebDriverComponent },
  { path: 'web-admin', component: WebAdminComponent },
  { path: '', redirectTo: 'web-admin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
