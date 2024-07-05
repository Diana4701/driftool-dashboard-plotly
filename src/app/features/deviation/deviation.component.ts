import {Component, Input} from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
@Component({
  selector: 'app-deviation',
  standalone: true,
  imports: [],
  templateUrl: './deviation.component.html',
  styleUrl: './deviation.component.css'
})
export class DeviationComponent {

  @Input() data: any;
  @Input() timePeriod!: string;
  @Input() operation!: string;

  ngOnInit() {
    this.plotData();
  }

  ngOnChanges() {
    this.plotData();
  }

  calculateSum(data: any[]): number {
    return data.reduce((sum, item) => sum + parseFloat(item.value), 0);
  }

  plotData() {
    const groupedData = this.groupDataByRepository(this.data);
    const traces: Partial<Plotly.ScatterData>[] = [];

    Object.keys(groupedData).forEach(repository => {
      const repoData = groupedData[repository];
      const timestamps = repoData.map(item => item.timestamp);
      const values = repoData.map(item => parseFloat(item.value));

      const result = this.calculateSum(repoData);

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
      title: `Deviation over ${this.timePeriod}`,
      xaxis: {
        title: 'Date'
      },
      yaxis: {
        title: 'Deviation'
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
