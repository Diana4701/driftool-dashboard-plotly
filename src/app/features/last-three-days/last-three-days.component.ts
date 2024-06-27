import { Component, Input } from '@angular/core';
import { CsvDataService } from "../../services/csv-data.service";
import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'app-last-three-days',
  standalone: true,
  imports: [],
  templateUrl: './last-three-days.component.html',
  styleUrls: ['./last-three-days.component.css']
})
export class LastThreeDaysComponent {
  @Input() operation!: string;
  lastThreeDaysData: any[] = [];

  constructor(private dataService: CsvDataService) {}

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.lastThreeDaysData = this.getLastThreeDaysData(data);
      this.plotData();
    });
  }

  getLastThreeDaysData(data: any[]): any[] {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return data.filter(item => new Date(item.timestamp) >= threeDaysAgo);
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

  calculateSum(data: any[]): number {
    return data.reduce((sum, item) => sum + parseFloat(item.value), 0);
  }

  calculateAverage(data: any[]): number {
    const sum = data.reduce((sum, item) => sum + parseFloat(item.value), 0);
    return sum / data.length;
  }

  plotData() {
    const groupedData = this.groupDataByRepository(this.lastThreeDaysData);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);
      const values = repoData.map(item => parseFloat(item.value));

      let result: number;
      if (this.operation === 'sum') {
        result = this.calculateSum(repoData);
      } else if (this.operation === 'average') {
        result = this.calculateAverage(repoData);
      } else {
        result = 0; // default case
      }

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
      title: `Result (${this.operation}) over Last 3 Days`,
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: this.operation
      }
    };

    Plotly.newPlot('chart-last-three-days', traces, layout);
  }
}
