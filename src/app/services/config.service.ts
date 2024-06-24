import {Inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl =  '../assets/configuration.json';
  private configSubject = new BehaviorSubject<any>(null);
  config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadConfig();
  }



  loadConfig() {
    this.http.get(this.configUrl).subscribe(config => {
      this.configSubject.next(config);
    });
  }

  updateConfig(config: any) {
    this.configSubject.next(config);
  }


}
