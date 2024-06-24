import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FeatureToggleService} from "../../services/feature-toggle.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {FeatureFlagDirective} from "../../feature-flag.directive";
import {DashboardViewComponent} from "../../dashboard-view/dashboard-view.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  template: `
    <div *appFeatureToggle="{category: 'time', name: 'last_week'}" >
      <h2>Last Week Feature is Enabled! (TimeComponent)</h2>
      <button (click)="navigateTo('dashboard')">Go to Dashboard</button>

    </div>`,
  styleUrl: './time.component.css'
})
export class TimeComponent implements OnInit{


  constructor(private featureTogglesService: FeatureToggleService, private router: Router) {

  }
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
  ngOnInit() {
    }
}
