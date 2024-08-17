import {Inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import {ConfigSection} from "../models/model";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = '../assets/checkboxes.json';
  private configSubject = new BehaviorSubject<any>(null);
  config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadConfig();
  }



  loadConfig(): Observable<ConfigSection[]> {
    return this.http.get<ConfigSection[]>(this.configUrl).pipe(
      tap(config => this.configSubject.next(config))
    );
  }



}
