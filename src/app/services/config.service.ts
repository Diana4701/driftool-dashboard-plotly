import {Inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import { HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StrategyConfigService {


  private configUrl = '../../assets/configuration.json';
  private configSubject = new BehaviorSubject<any>([]);
  config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  loadStrategies(): Observable<any> {
    return this.http.get<any>(this.configUrl).pipe(
    tap(config => this.configSubject.next(config))
    );
  }

  getStrategiesConfig(): Observable<any> {
    return this.http.get<any>(this.configUrl);
  }





}
