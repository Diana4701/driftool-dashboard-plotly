import {Component, Input, OnChanges, OnInit} from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-sum',
  standalone: true,
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.css']
})
export class SumComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() timePeriod!: string;
  @Input() operation!: string;

  ngOnInit() {
    this.plotData();
  }

  ngOnChanges() {
    this.plotData();
  }

  calculateAverage(data: any[]): number {
    return data.reduce((sum, item) => sum + parseFloat(item.value), 0);
  }

  plotData() {
    if (!this.data || this.data.length === 0) {
      return;
    }
    console.log('Plotting data for Time Period:', this.timePeriod);
    const groupedData = this.groupDataByRepository(this.data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);
      const values = repoData.map(item => parseFloat(item.value));

      const result = this.calculateAverage(repoData);

      traces.push({
        x: timestamps,
        y: new Array(timestamps.length).fill(result),
        type: 'scatter',
        mode: 'lines',
        name: `${repository} - Sum: ${result.toFixed(2)}`,
        line: { shape: 'linear' }
      });
    });

    const layout = {
      title: `Sum over ${this.timePeriod}`,
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Sum'
      }
    };
    Plotly.newPlot('chart-sum', traces, layout);
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
