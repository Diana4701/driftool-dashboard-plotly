import {Inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import {ConfigSection} from "../models/model";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = '../assets/checkboxes.json';
  private configSubject = new BehaviorSubject<ConfigSection[]>([]);
  config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<ConfigSection[]> {
    return this.http.get<ConfigSection[]>(this.configUrl).pipe(
      tap(config => this.configSubject.next(config))
    );
  }

  getTimePeriods(): Observable<string[]> {
    return this.config$.pipe(
      map(config => config.find(section => section.name === 'timePeriodOptions')?.options.map(option => option.value) || [])
    );
  }

  getOperations(): Observable<string[]> {
    return this.config$.pipe(
      map(config => config.find(section => section.name === 'calculations')?.options.map(option => option.value) || [])
    );
  }

}
