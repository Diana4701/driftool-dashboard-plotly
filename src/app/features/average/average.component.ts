import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import {DataItem, CheckboxOption} from "../../models/model";
import {ChartService} from "../../services/chart-service.service";

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
  @Input() timePeriodLabels: { [key: string]: string } = {};

  chartId: string = 'chart-average';
  zoomEnabled: boolean = true;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.plotAverageChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.plotAverageChart();
  }

  async plotAverageChart() {
    const groupedData = this.groupDataByRepository(this.data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);
      const result = this.calculateAverage(repoData);

      traces.push({
        x: timestamps,
        y: new Array(timestamps.length).fill(result),
        type: 'scatter',
        mode: 'lines',
        name: `${repository} - Avg: ${result.toFixed(2)}`,
        line: { shape: 'linear' }
      });
    });

    const layout = {
      title: `Average over ${this.timePeriodLabels[this.timePeriod]}`,
      xaxis: { title: 'Date' },
      yaxis: { title: 'Average' }
    };

    const config = {
      scrollZoom: false,
      pan: true,
    };

    await this.chartService.createChart(this.chartId, traces, layout, config);
  }

  toggleZoom() {
    this.zoomEnabled = !this.zoomEnabled;
    this.chartService.toggleZoom(this.chartId, this.zoomEnabled);
  }

  private groupDataByRepository(data: any[]): { [key: string]: any[] } {
    return data.reduce((acc, item) => {
      if (!acc[item.repository]) {
        acc[item.repository] = [];
      }
      acc[item.repository].push(item);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  private calculateAverage(data: any[]): number {
    // Implement your average calculation logic
    // Example:
    const sum = data.reduce((total, item) => total + parseFloat(item.value), 0);
    return sum / data.length;
  }
}
