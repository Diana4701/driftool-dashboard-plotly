import { Component } from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {ConfigViewComponent} from "./config-view/config-view.component";
import {DashboardViewComponent} from "./dashboard-view/dashboard-view.component";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {TimeComponent} from "./features/time/time.component";
import {FeatureFlagDirective} from "./feature-flag.directive";
import {FeatureFlagGuard} from "./feature-flag.guard";

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, RouterModule,  NgIf, TimeComponent, FeatureFlagDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard-plotly-project';

  constructor(private router: Router) {}

}
