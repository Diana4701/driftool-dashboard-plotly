import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
@Component({
  selector: 'app-deviation',
  standalone: true,
  imports: [],
  templateUrl: './deviation.component.html',
  styleUrl: './deviation.component.css'
})
export class DeviationComponent implements OnInit, OnChanges{
  @Input() data: any;
  @Input() timePeriod!: string;
  @Input() operation!: string;

  ngOnInit() {
    this.plotData();
  }

  ngOnChanges() {
    this.plotData();
  }

  // Method to calculate standard deviation
  calculateStandardDeviation(data: any[]): number {
    const n = data.length;
    const mean = data.reduce((sum, item) => sum + parseFloat(item.value), 0) / n;
    const variance = data.reduce((sum, item) => sum + Math.pow(parseFloat(item.value) - mean, 2), 0) / n;
    return Math.sqrt(variance);
  }

  plotData() {
    const groupedData = this.groupDataByRepository(this.data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);

      // Calculate standard deviation instead of sum
      const stdDev = this.calculateStandardDeviation(repoData);
      const stdDevValues = repoData.map(() => stdDev);

      traces.push({
        x: timestamps,
        y: stdDevValues,
        type: 'scatter',
        mode: 'lines',
        name: repository,
        line: { shape: 'linear' }
      });
    });

    const layout = {
      title: `Standard deviation over ${this.timePeriod}`,
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Standard Deviation of Statement Drift'
      }
    };

    Plotly.newPlot('chart-deviation', traces, layout);
  }

  groupDataByRepository(data: any[]): { [key: string]: any[] } {
    return data.reduce((acc, item) => {
      if (!acc[item.repository]) {
        acc[item.repository] = [];
      }
      acc[item.repository].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

}
