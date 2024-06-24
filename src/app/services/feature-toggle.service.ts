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
  private featureTogglesSubject = new BehaviorSubject<FeatureFlagResponse| null>({features: {}});
  featureToggles$ = this.featureTogglesSubject.asObservable();
  private featureFlags: Record<string, boolean> = {};
  constructor(private httpClient: HttpClient) {}


  loadFeatureFlags(): Observable<FeatureFlagResponse> {
    return this.httpClient.get<FeatureFlagResponse>('../assets/conf.json').pipe(
      tap((features) => {
        for (const category in features.features) {
          features.features[category].forEach(feature => {
            if (feature.enabled === undefined) {
              feature.enabled = false;
            }
            this.featureFlags[`${category}.${feature.name}`] = feature.enabled;
          });
        }
        this.featureTogglesSubject.next(features);
      })
    );
  }

  // Method to set a feature flag
  setFeatureFlag(key: string, value: boolean): void {
    this.featureFlags[key] = value;
    const currentToggles = this.featureTogglesSubject.getValue();
    if (currentToggles) {
      const [category, featureName] = key.split('.');
      const categoryFlags = currentToggles.features[category] || [];
      const feature = categoryFlags.find(f => f.name === featureName);
      if (feature) {
        feature.enabled = value;
      } else {
        categoryFlags.push({ name: featureName,label:'', enabled: value });
      }
      currentToggles.features[category] = categoryFlags;
      this.featureTogglesSubject.next(currentToggles);
    }
  }

  // Method to get a feature flag
  getFeatureFlags(): FeatureFlagResponse | null {
    return this.featureTogglesSubject.getValue();
  }

   //asynchronous approach which is more complex
   //isFeatureEnabled(category:string, featureName: string): Observable<boolean> {}

  isFeatureEnabled(category: string, featureName: string): boolean{
    const toggles = this.featureTogglesSubject.getValue();
    if (!toggles) {
      return false;
    }
    const categoryFlags = toggles.features[category];
    const feature = categoryFlags?.find(f => f.name === featureName);
    return feature?.enabled ?? false;
  }

 /* updateFeatureToggle(feature: string, key: string, value: boolean) {
    const currentConfig = this.featureTogglesSubject.getValue();
      if (currentConfig) {
        const updatedConfig = { ...currentConfig };
        const featureOptions = currentConfig.features[feature]?.options;
        if (featureOptions) {
          const option = featureOptions.find((opt: any) => opt.name === key);
          if (option) {
            option.enabled = value;
            console.log('Updated config:', currentConfig)
            this.featureTogglesSubject.next(currentConfig);
            this.configService.updateConfig(currentConfig); // this line ensures that the updated config is saved in the ConfigService

          }
        }
      }

    }*/

  /*private updateConfig(config: any) {
    this.http.post('../update-config', config).subscribe();
  }*/

}
