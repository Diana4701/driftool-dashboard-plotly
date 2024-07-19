import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, of, tap} from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";



interface FeatureFlagResponse {
 features: {[category: string]: {name:string; label: string; enabled: boolean}[];};
}



@Injectable({
  providedIn: 'root'
})

export class FeatureToggleService {
 // private httpClient = inject(HttpClient);
  private featureToggles = new BehaviorSubject<FeatureFlagResponse| null>({features: {}});
  featureToggles$ = this.featureToggles.asObservable();
  private timeIntervalSelected = new BehaviorSubject<boolean>(false);
  timeInterval$ = this.timeIntervalSelected.asObservable();
  constructor(private httpClient: HttpClient) {}


  loadToggles(): Observable<any> {
    return this.httpClient.get<any>('../assets/configuration.json').pipe(
      tap((features) => {
        this.featureToggles.next(features);
      })
    );
  }

}
