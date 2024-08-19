import {AfterViewInit, Component, ElementRef, Injectable, Input, OnChanges, ViewChild} from '@angular/core';
import {AnalysisStrategy, TimePeriodStrategy} from "../analysis-strategy";
import {DataItem} from "../../models/toggles-models";
import {NgIf} from "@angular/common";
import * as Plotly from "plotly.js-dist-min";
import {TimePeriodStrategyComponent} from "../time-period-strategy/time-period-strategy.component";

@Component({
  selector: 'app-average-strategy',
  standalone: true,
  imports: [
    NgIf
  ],
  providers: [AverageStrategyComponent],
  templateUrl: './average-strategy.component.html',
  styleUrl: './average-strategy.component.css'
})
export class AverageStrategyComponent implements AnalysisStrategy, OnChanges, AfterViewInit {

  @Input() data: DataItem[] = [];
  @Input() operation: string = '';
  @Input() timePeriod: string = '';
  result: number | null = null;
  @ViewChild('plotContainer', { static: true }) plotContainer!: ElementRef;

  private timePeriodStrategy: TimePeriodStrategyComponent = new TimePeriodStrategyComponent();

  ngOnChanges() {
    if (this.operation === 'average') {
      const filteredData = this.timePeriodStrategy.execute(this.data, this.timePeriod);
      this.result = this.execute(filteredData); // Calculate result here
      this.plot(filteredData, this.timePeriod);
    }
  }

  ngAfterViewInit() {
    // Ensure plot renders after view initialization
    if (this.data && this.data.length > 0 && this.operation === 'average') {
      const filteredData = this.timePeriodStrategy.execute(this.data, this.timePeriod);
      this.plot(filteredData, this.timePeriod)}
  }

  execute(data: DataItem[]): number {
    const sum = data.reduce((sum, item) => sum + item.value, 0);
    return sum / data.length;
  }

  plot(data: DataItem[], timePeriod: string) {
    const groupedData = this.groupDataByRepository(data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach((repository) => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map((item) => item.timestamp);
      const result = this.execute(repoData);

      traces.push({
        x: timestamps,
        y: new Array(timestamps.length).fill(result),
        type: 'scatter',
        mode: 'lines',
        name: `${repository} - Average: ${result.toFixed(2)}`,
        line: { shape: 'linear' },
      });
    });

    const layout: Partial<Plotly.Layout> = {
      title: `Average Time Series over ${timePeriod}`,
      xaxis: { title: `${timePeriod}` },
      yaxis: { title: 'Sum' },
    };

    Plotly.newPlot(this.plotContainer.nativeElement, traces, layout);
  }

  groupDataByRepository(data: DataItem[]): { [key: string]: DataItem[] } {
    return data.reduce((acc, item) => {
      if (!acc[item.repository]) {
        acc[item.repository] = [];
      }
      acc[item.repository].push(item);
      return acc;
    }, {} as { [key: string]: DataItem[] });
  }
}

