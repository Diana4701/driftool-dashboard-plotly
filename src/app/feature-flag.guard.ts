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

export class FeatureFlagGuard implements CanActivate{
  constructor(
    private featureToggleService: FeatureToggleService,
    private router: Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const category = route.data['category'];
    const featureName = route.data['featureName'];
    const isEnabled= this.featureToggleService.isFeatureEnabled(category, featureName);
    if(isEnabled){
      return true;
      //return this.router.createUrlTree(['/time']);
    }  else {
       // Redirect to fallback route
      return this.router.createUrlTree(['/config']);
    }
  }
}
