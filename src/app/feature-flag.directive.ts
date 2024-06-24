import {Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {FeatureToggleService} from "./services/feature-toggle.service";
import {Observable, Subscription} from "rxjs";
import { FeatureFlagGuard } from "./feature-flag.guard";
import {Router} from "@angular/router";


@Directive({
  selector: '[appFeatureToggle]',
  standalone: true
})
export class FeatureFlagDirective implements OnInit {
  @Input('appFeatureToggle') feature!: { category: string; name: string };
  private subscription!: Subscription;
  //@Input() featureFlagCategory!: string;
  //@Input() featureFlagName!: string;
  // templateRef = Inject(TemplateRef);
  // viewContainer = Inject(ViewContainerRef);
  //featureFlagsService = Inject(FeatureToggleService);
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureFlagsService: FeatureToggleService,
    private router: Router
  ) {
  }

  ngOnInit() {
    //const { category, name } = this.feature;
    this.subscription = this.featureFlagsService.featureToggles$.subscribe(() => {
      this.updateView();
    });
    console.log('ngOnInit Directive');

  }

  private updateView() {
    const isEnabled = this.featureFlagsService.isFeatureEnabled(this.feature.category, this.feature.name);
    console.log(`Feature [${this.feature.category}.${this.feature.name}] is ${isEnabled ? 'enabled' : 'disabled'}`);

    if (isEnabled) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      //this.router.navigate(['/dashboard']);
    } else if (!isEnabled) {
      this.viewContainer.clear();
      //this.router.navigate(['/config']);
    }
  }

  handleButtonClick() {
    const isEnabled = this.featureFlagsService.isFeatureEnabled(this.feature.category, this.feature.name);
    if (isEnabled) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Feature is disabled');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
