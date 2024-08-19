import {Routes} from '@angular/router';
import {ConfigViewComponent} from "./config-view/config-view.component";
import {DashboardViewComponent} from "./dashboard-view/dashboard-view.component";



export const routes: Routes = [
  { path: '', redirectTo: '/config', pathMatch: 'full' },
  { path: 'config', component: ConfigViewComponent },
  {path: '', component:ConfigViewComponent},
  {path: 'dashboard', component:DashboardViewComponent},
{ path: '**', redirectTo: '/config' }

];

