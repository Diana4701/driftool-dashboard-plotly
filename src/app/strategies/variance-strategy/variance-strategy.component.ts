import { Component } from '@angular/core';

@Component({
  selector: 'app-variance-strategy',
  standalone: true,
  imports: [],
  templateUrl: './variance-strategy.component.html',
  styleUrl: './variance-strategy.component.css'
})
export class VarianceStrategyComponent {
  execute(data: any[]): number {
    const mean = data.reduce((acc, value) => acc + value, 0) / data.length;
    return data.reduce((acc, value) => acc + (value - mean) ** 2, 0) / data.length;
  }
}
