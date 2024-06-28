import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-average',
  standalone: true,
  templateUrl: './average.component.html',
  styleUrls: ['./average.component.css']
})
export class AverageComponent implements OnInit, OnChanges {
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
    const sum = data.reduce((sum, item) => sum + parseFloat(item.value), 0);
    return sum / data.length;
  }

  plotData() {
    const groupedData = this.groupDataByRepository(this.data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);
      const values = repoData.map(item => parseFloat(item.value));

      const result = this.calculateAverage(repoData);

      traces.push({
        x: timestamps,
        y: values,
        type: 'scatter',
        mode: 'lines',
        name: repository,
        line: { shape: 'linear' }
      });
    });

    const layout = {
      title: `Average over ${this.timePeriod}`,
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Average'
      }
    };

    Plotly.newPlot('chart-average', traces, layout);
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
