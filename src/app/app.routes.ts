import {RouterModule, Routes} from '@angular/router';
import {ConfigViewComponent} from "./config-view/config-view.component";
import {DashboardViewComponent} from "./dashboard-view/dashboard-view.component";

import {FeatureFlagGuard} from "./feature-flag.guard";
import {NgModule} from "@angular/core";

let DashboardComponent;
export const routes: Routes = [
  { path: '', redirectTo: '/config', pathMatch: 'full' },
  { path: 'config', component: ConfigViewComponent },
  {path: '', component:ConfigViewComponent},
  {path: 'dashboard', component:DashboardViewComponent},
  /*{path: 'dashboard',
    canActivate: [FeatureFlagGuard],
    data: {category: 'time', featureName: 'last_week' },
    component: DashboardViewComponent
},*/
{ path: '**', redirectTo: '/config' }

];

