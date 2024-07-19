import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CsvDataService} from "../services/csv-data.service";
import {FeatureToggleService} from "../services/feature-toggle.service";
import {RepositoryData} from "../repository-data";
import moment from 'moment';
import * as Plotly from 'plotly.js-dist-min';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {Configuration} from "../configuration";
import {NgForOf, NgIf} from "@angular/common";

import {Router} from "@angular/router";
import {CheckboxState, DataItem} from "../models/toggles-models";
import {StrategyContextService} from "../services/strategy-context.service";
import {SumStrategyComponent} from "../strategies/sum-strategy/sum-strategy.component";
import {AnalysisStrategy, TimePeriodStrategy} from "../strategies/analysis-strategy";
import {TimePeriodStrategyComponent} from "../strategies/time-period-strategy/time-period-strategy.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    NgForOf,
    SumStrategyComponent,

  ],
  providers: [CsvDataService, FeatureToggleService, HttpClient],
  templateUrl: 'dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})


export class DashboardViewComponent implements OnInit {
  data: DataItem[] = [];
  selectedConfig: { operation: string[], timePeriod: string } = { operation: [], timePeriod: '' };
  @ViewChild('strategyContainer', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  private timePeriodStrategy: TimePeriodStrategy = new TimePeriodStrategyComponent();
  constructor(
    private operationContextService: StrategyContextService,
    private csvService: CsvDataService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.operationContextService.operationConfig$.subscribe(config => {
      this.selectedConfig = config;
     // this.loadStrategyComponents();
    });
    this.csvService.data$.subscribe(data => {
      this.data = data;
      this.loadStrategyComponents();
    });
  }

  loadStrategyComponents() {
    this.viewContainerRef.clear();
    this.selectedConfig.operation.forEach(operation => {
      const componentClass = this.operationContextService.getStrategyComponent(operation);
      if (componentClass) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const instance = componentRef.instance as AnalysisStrategy;
        instance.data = this.data;
        instance.operation = operation;
        instance.timePeriod = this.selectedConfig.timePeriod;
      }
    });
  }

  navigateToConfig() {
    this.router.navigate(['/config']);
  }
}
