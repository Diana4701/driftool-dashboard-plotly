import {Component,  Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CsvDataService} from "../services/csv-data.service";

import {HttpClient, HttpClientModule} from "@angular/common/http";
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
  providers: [CsvDataService, HttpClient],
  templateUrl: 'dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})


export class DashboardViewComponent implements OnInit {
  data: DataItem[] = [];
  selectedConfig: { operation: string[], timePeriod: string } = { operation: [], timePeriod: '' };
  @ViewChild('strategyContainer', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  constructor(
    private operationContextService: StrategyContextService,
    private csvService: CsvDataService,
    private router: Router,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.operationContextService.operationConfig$.subscribe(config => {
      this.selectedConfig = config;
      this.updateStrategyComponents();
    });
    this.csvService.data$.subscribe(data => {
      this.data = data;
      this.updateStrategyComponents();
    });
  }




  updateStrategyComponents() {
    this.viewContainerRef.clear(); // Clear existing components

    this.selectedConfig.operation.forEach(operation => {
      // Execute operation using the service
      const result = this.operationContextService.executeOperation(operation, this.data, this.selectedConfig.timePeriod);
      console.log(`Result of ${operation}: ${result}`);

      // Get the component type
      const componentType = this.operationContextService.getStrategyComponent(operation);
      if (componentType) {
        const componentRef = this.viewContainerRef.createComponent(componentType);
        (componentRef.instance as any).data = this.data;
        (componentRef.instance as any).operation = operation;
        (componentRef.instance as any).timePeriod = this.selectedConfig.timePeriod;
      }
    });
  }
  navigateToConfig() {
    this.router.navigate(['/config']);
  }
}
