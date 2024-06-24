import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
//import { HttpClientModule } from "@angular/common/http";
import {FeatureToggleService} from "../services/feature-toggle.service";
import {CsvDataService} from "../services/csv-data.service";
import {Router} from "@angular/router";
import {Configuration} from "../configuration";
import {ConfigService} from "../services/config.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DashboardViewComponent} from "../dashboard-view/dashboard-view.component";
import {TimeComponent} from "../features/time/time.component";
import {FeatureFlagDirective} from "../feature-flag.directive";



@Component({
  selector: 'app-configuration-view',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    HttpClientModule,
    TimeComponent,
    FeatureFlagDirective
  ],
  providers: [ConfigService, CsvDataService, FeatureToggleService, HttpClientModule, HttpClient],
  template: `
    <h1>Feature Toggles</h1>
    <div *ngFor="let category of categories">
      <h2>{{ category }}</h2>
      <div *ngFor="let feature of getFeatures(category)">
        <label>
          <input type="checkbox" [ngModel]="feature.enabled" (ngModelChange)="toggleFeature(category, feature.name, $event)" />
          {{ feature.label }}
        </label>
       <!-- <div *ngIf="feature.name === 'last_week' && feature.enabled">-->
         <!--  <div *appFeatureToggle="{category: 'time', name: 'last_week'}">
          </div>-->
         <!--<app-time></app-time>-->
        </div>
      </div>
   <!-- </div>-->
    <div class="navigation-buttons">
     <!-- <button *appFeatureToggle="{category: 'time', name: 'last_week'}" (click)="onFeatureButtonClick()">Check Feature and Navigate</button>-->
      <button (click)="navigateToDashboard()">Go to Dashboard</button>
    </div>
  `,
  styleUrl: './config-view.component.css'
})
export class ConfigViewComponent implements OnInit, AfterViewInit{
 categories: string[] = [];
 features: any = {};

  constructor(private configService: ConfigService,
              private featureToggleService: FeatureToggleService,
              private router: Router) {}

 ngOnInit()
  {
    console.log('ConfigViewComponent ngOnInit called');
   // this.featureToggleService.loadFeatureToggles().then(() => {
    this.featureToggleService.loadFeatureFlags().subscribe(toggles => {
      if (toggles) {
        this.categories = Object.keys(toggles.features);
        this.features = toggles.features;
      }
    });
  }

  ngAfterViewInit() {
    this.featureToggleService.featureToggles$.subscribe(toggles => {
      if (toggles) {
        this.categories = Object.keys(toggles.features);
        this.features = toggles.features;
      }
    });
  }

  getFeatures(category: string){
    return this.features[category]|| [];

  }

  toggleFeature(category: string, featureName: string, isEnabled: boolean){
    console.log(`Toggling feature: ${featureName} in category: ${category} to ${isEnabled}`);

    const feature = this.features[category].find((f: any) => f.name === featureName);

    if (feature) {
      feature.enabled = isEnabled;
      this.featureToggleService.setFeatureFlag(`${category}.${featureName}`, isEnabled);
      console.log(`Feature ${featureName} is now ${isEnabled ? 'enabled' : 'disabled'}`);
     // this.navigateToDashboard();
      //  if (category === 'time' && featureName === 'last_week' && isEnabled) {
     //   this.router.navigate(['/time']);
     // }
    }

  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToConfig() {
    this.router.navigate(['/config']);
  }
  isLastWeekFeatureEnabled(): boolean {
    return this.features['time'].find((f: any) => f.name === 'last_week')?.enabled || false;
  }

 /* onFeatureButtonClick() {
    const directive = new FeatureFlagDirective(
      null,
      null,
      this.featureToggleService,
      this.router
    );
    directive.feature = { category: 'time', name: 'last_week' };
    directive.handleButtonClick();
  }*/


  onConfigChange(feature: string, key: string, value: boolean) {
   // this.featureToggleService.updateFeatureToggle(feature, key, value);
    //console.log(`Feature toggle changed: ${feature}, ${key}, ${value}`);
    if (feature === 'time' && value) {
      this.router.navigate(['/']).then(success => {
        if(success) {
          console.log('Navigation successful');
        } else {
          console.error('Navigation to dashboard failed');
        }
      });
    }
  }

  }
