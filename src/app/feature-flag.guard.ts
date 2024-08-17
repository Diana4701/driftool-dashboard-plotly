import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
} from "@angular/router";
import {FeatureToggleService} from "./services/feature-toggle.service";

@Injectable()

export class FeatureFlagGuard {
  constructor(
    private featureToggleService: FeatureToggleService,
    private router: Router
  ) {

  }

}
