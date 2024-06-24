import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot, UrlTree
} from "@angular/router";
import {CheckboxService} from "./services/feature-toggle.service";

@Injectable()

export class FeatureFlagGuard {
  constructor(
    private featureToggleService: CheckboxService,
    private router: Router
  ) {

  }

}
