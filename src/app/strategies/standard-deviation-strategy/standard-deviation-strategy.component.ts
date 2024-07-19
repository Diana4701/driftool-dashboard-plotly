import { Component } from '@angular/core';
import {VarianceStrategyComponent} from "../variance-strategy/variance-strategy.component";

@Component({
  selector: 'app-standard-deviation-strategy',
  standalone: true,
  imports: [],
  templateUrl: './standard-deviation-strategy.component.html',
  styleUrl: './standard-deviation-strategy.component.css'
})
export class StandardDeviationStrategyComponent {
  private varianceStrategy = new VarianceStrategyComponent();

  execute(data: any[]): number {
    return Math.sqrt(this.varianceStrategy.execute(data));
  }
}
