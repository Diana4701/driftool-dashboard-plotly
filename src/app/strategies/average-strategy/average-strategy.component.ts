import {Component, Input, OnChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {DataItem} from "../../models/toggles-models";
import * as Plotly from "plotly.js-dist-min";
import {AnalysisStrategy} from "../analysis-strategy";

@Component({
  selector: 'app-average-strategy',
  standalone: true,
  imports: [
    NgIf
  ],
  template: `<div *ngIf="result !== null">
    <h3>{{ operation }} for {{ timePeriod }}</h3>
    <p>Result: {{ result }}</p>
    <div id="plot"></div>
  </div>
  <p>average-strategy works!</p>
  <div id="plot"></div>


  `,
  styleUrl: './average-strategy.component.css'
})
export class AverageStrategyComponent  implements AnalysisStrategy, OnChanges{
  @Input() data: DataItem[] = [];
  @Input() operation: string = '';
  @Input() timePeriod: string = '';
  result: number | null = null;

  ngOnChanges() {
    if (this.operation === 'average') {
      this.result = this.execute(this.data, this.timePeriod);
      this.plot(this.data, this.timePeriod);
    }
  }

  execute(data: DataItem[], timePeriod: string): number {
    // Example logic for average
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return total / data.length;
  }

  plot(data: DataItem[], timePeriod: string) {
    const plotData: Partial<Plotly.ScatterData>[] = [
      {
        x: data.map(item => item.timestamp),
        y: data.map(item => item.value),
        type: 'scatter' as const
      }
    ];
    Plotly.newPlot('plot', plotData);
  }
}
