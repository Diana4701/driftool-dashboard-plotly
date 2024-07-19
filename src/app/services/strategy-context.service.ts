import { Injectable } from '@angular/core';
import {AnalysisStrategy} from "../strategies/analysis-strategy";

import {SumStrategyComponent} from "../strategies/sum-strategy/sum-strategy.component";
import {VarianceStrategyComponent} from "../strategies/variance-strategy/variance-strategy.component";
import {
  StandardDeviationStrategyComponent
} from "../strategies/standard-deviation-strategy/standard-deviation-strategy.component";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {StrategyConfigService} from "./config.service";
import {HttpClient} from "@angular/common/http";
import {ConfigSection, DataItem} from "../models/toggles-models";
import {AverageStrategyComponent} from "../strategies/average-strategy/average-strategy.component";
import {TimePeriodStrategyComponent} from "../strategies/time-period-strategy/time-period-strategy.component";

@Injectable({
  providedIn: 'root'
})
export class StrategyContextService {
  private configUrl = '../../assets/configuration.json';
  private configSubject = new BehaviorSubject<ConfigSection[]>([]);
  config$ = this.configSubject.asObservable();
  private operationConfigSubject = new BehaviorSubject<{operation: string[], timePeriod: string}>({operation: [], timePeriod: ''});
  operationConfig$ = this.operationConfigSubject.asObservable();



  private strategyComponentMap: { [key: string]: any } = {
    sum: SumStrategyComponent,
    average: AverageStrategyComponent,
    time: TimePeriodStrategyComponent
  };


  constructor(private http: HttpClient) { }

  loadStrategies(): Observable<ConfigSection[]> {
    return this.http.get<ConfigSection[]>(this.configUrl).pipe(
      tap(config => this.configSubject.next(config))
    );
  }

  setOperationConfig(config: { operation: string[], timePeriod: string }) {
    this.operationConfigSubject.next(config);
  }

  getOperationConfig(): { operation: string[], timePeriod: string } {
    return this.operationConfigSubject.value;
  }

  getStrategyComponent(operation: string) {
    return this.strategyComponentMap[operation];
  }

 /* executeOperation(operation: string, data: DataItem[], timePeriod: string): number {
    if (this.strategyMapComponent[operation]) {
      return this.strategyMapComponent[operation].execute(data, timePeriod);
    }
    return 0;
  }*/



}


