import { Injectable, Type } from '@angular/core';
import {SumStrategyComponent} from "../strategies/sum-strategy/sum-strategy.component";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ConfigSection, DataItem} from "../models/toggles-models";
import {AverageStrategyComponent} from "../strategies/average-strategy/average-strategy.component";
import {TimePeriodStrategyComponent} from "../strategies/time-period-strategy/time-period-strategy.component";

@Injectable({
  providedIn: 'root'
})
export class StrategyContextService {
  private configUrl = '../assets/configuration.json';
  private configSubject = new BehaviorSubject<ConfigSection[]>([]);
  private operationConfigSubject = new BehaviorSubject<{ operation: string[], timePeriod: string }>({ operation: [], timePeriod: '' });
  operationConfig$ = this.operationConfigSubject.asObservable();

  private strategyComponentMap: { [key: string]: Type<any> } = {
    sum: SumStrategyComponent,
    average: AverageStrategyComponent,
    time: TimePeriodStrategyComponent,
  };

  constructor(private http: HttpClient) {}

  loadStrategies(): Observable<ConfigSection[]> {
    return this.http.get<ConfigSection[]>(this.configUrl).pipe(
      tap(config => this.configSubject.next(config)),
    );
  }

  setOperationConfig(config: { operation: string[], timePeriod: string }) {
    this.operationConfigSubject.next(config);
  }

  getOperationConfig(): { operation: string[], timePeriod: string } {
    return this.operationConfigSubject.value;
  }

  getStrategyComponent(operation: string): Type<any> | null {
    return this.strategyComponentMap[operation] || null;
  }

  public executeOperation(operation: string, data: DataItem[], timePeriod: string): number {
    const strategyComponentType = this.getStrategyComponent(operation);
    if (strategyComponentType) {
      const strategyComponentInstance = new strategyComponentType(); // Manually create the instance
      return strategyComponentInstance.execute(data, timePeriod);
    }
    return 0; // Default value if strategy is not found
  }
}


