import {bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {APP_INITIALIZER, enableProdMode, importProvidersFrom} from "@angular/core";
import {provideRouter, RouterModule} from "@angular/router";
import {routes} from "./app/app.routes";
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {CheckboxService} from "./app/services/feature-toggle.service";
import {lastValueFrom, tap} from "rxjs";
import {appConfig} from "./app/app.config";
import {FeatureFlagGuard} from "./app/feature-flag.guard";


//bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

function initializeAppFactory(featureToggleService: CheckboxService) {
  return () => lastValueFrom(featureToggleService.loadCheckboxes());
}

bootstrapApplication(AppComponent, {providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, HttpClient),

    FeatureFlagGuard,
    CheckboxService,
    {
      provide: APP_INITIALIZER,
      useFactory:  initializeAppFactory,
      deps: [CheckboxService],
      multi: true
    }

  ]}).catch((err) => console.error(err));
