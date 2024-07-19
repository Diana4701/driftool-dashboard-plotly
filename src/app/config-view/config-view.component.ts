import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
//import { HttpClientModule } from "@angular/common/http";
import {FeatureToggleService} from "../services/feature-toggle.service";
import {CsvDataService} from "../services/csv-data.service";
import {Router} from "@angular/router";
import {Configuration} from "../configuration";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DashboardViewComponent} from "../dashboard-view/dashboard-view.component";
import {CheckboxState, ConfigSection} from "../models/toggles-models";
import {StrategyContextService} from "../services/strategy-context.service";





@Component({
  selector: 'app-configuration-view',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    HttpClientModule,

  ],
  providers: [ CsvDataService, FeatureToggleService, HttpClientModule, HttpClient],
  templateUrl: 'config-view.component.html',
  styleUrl: './config-view.component.css'
})
export class ConfigViewComponent implements OnInit {
  configSections: ConfigSection[] = [];
  selectedConfig: { operation: string[], timePeriod: string } = { operation: [], timePeriod: '' };
  checkboxState: CheckboxState = {};

  constructor(private contextService: StrategyContextService, private router: Router) {}

  ngOnInit() {
    this.contextService.loadStrategies().subscribe(config => {
      this.configSections = config;
      this.initializeSelections();
    });
  }

  initializeSelections() {
    this.configSections.forEach(section => {
      if (section.name === 'timePeriodOptions') {
        this.selectedConfig.timePeriod = section.options[0].value; // Initialize first option as selected
      } else {
        section.options.forEach(option => {
          this.checkboxState[option.value] = {
            label: option.label,
            value: option.value,
            checked: false
          };
        });
      }
    });
  }

  onSubmit() {
    this.selectedConfig.operation = Object.keys(this.checkboxState)
      .filter(key => this.checkboxState[key].checked);
    this.contextService.setOperationConfig(this.selectedConfig);
    this.router.navigate(['/dashboard']);
  }

  resetAllSettings() {
    this.selectedConfig = { operation: [], timePeriod: '' };
    this.checkboxState = {};
    this.initializeSelections();
  }






  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }


  }
