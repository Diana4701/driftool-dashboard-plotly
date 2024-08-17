import {Component, Input, OnInit} from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
@Component({
  selector: 'app-drift',
  standalone: true,
  imports: [],
  templateUrl: './drift.component.html',
  styleUrl: './drift.component.css'
})
export class DriftComponent implements OnInit{
  @Input() data: any;
  @Input() timePeriod!: string;
  @Input() operation!: string;

  ngOnInit() {
    this.plotData();
  }


  plotData() {
    const groupedData = this.groupDataByRepository(this.data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);
      const values = repoData.map(item => parseFloat(item.value));


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
      title: `DRIFT Time Series over ${this.timePeriod}`,
      xaxis: {
        title: `${this.timePeriod}`
      },
      yaxis: {
        title: 'Statement Drift'
      }
    };

    Plotly.newPlot('chart-values', traces, layout);
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
