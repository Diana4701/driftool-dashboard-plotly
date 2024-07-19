import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";

import { routes } from './app.routes';

import {FeatureToggleService} from "./services/feature-toggle.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(HttpClientModule, HttpClient),
    FeatureToggleService
  ]
};
