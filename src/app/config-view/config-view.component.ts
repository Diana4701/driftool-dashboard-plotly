import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CsvDataService} from "../services/csv-data.service";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
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
  providers: [ CsvDataService, HttpClientModule, HttpClient],
  templateUrl: 'config-view.component.html',
  styleUrl: './config-view.component.css'
})
export class ConfigViewComponent implements OnInit {
  configSections: ConfigSection[] = [];
  selectedConfig: {operation: string[], timePeriod: string} = {operation: [], timePeriod: ''};
  checkboxState: CheckboxState = {};

  constructor(private contextService: StrategyContextService, private router: Router) {}

  /*ngOnInit() {
    // Load config sections and initialize selectedConfig
    this.contextService.loadStrategies().subscribe(config => {
      this.configSections = config;
      this.initializeSelections();
    });
    const savedConfig = this.contextService.getOperationConfig();
    this.selectedOperations = savedConfig.operation;
    this.selectedTimePeriod = savedConfig.timePeriod;
  }*/

  ngOnInit() {
    // Load config sections and initialize selections
    this.contextService.loadStrategies().subscribe(config => {
      this.configSections = config;
      const savedConfig = this.contextService.getOperationConfig();

      if (savedConfig.operation.length > 0 || savedConfig.timePeriod) {
        this.selectedConfig = savedConfig;
      }

      this.initializeSelections(); // Initialize or repopulate selections
    });
  }


// Helper method to populate checkbox state based on saved configuration


  initializeSelections() {
    this.configSections.forEach(section => {
      if (section.name === 'timePeriodOptions') {
        this.selectedConfig.timePeriod = this.selectedConfig.timePeriod || section.options[0].value;
      } else {
        section.options.forEach(option => {
          this.checkboxState[option.value] = {
            label: option.label,
            value: option.value,
            checked: this.selectedConfig.operation.includes(option.value)
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
    this.selectedConfig = {operation: [], timePeriod: ' '};
    this.initializeSelections();
  }



  }
