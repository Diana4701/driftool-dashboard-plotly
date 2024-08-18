import { Injectable } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chart: Plotly.PlotlyHTMLElement | null = null;
  private zoomEnabled = false;
  constructor() { }

  async createChart(elementId: string, traces: Partial<Plotly.ScatterData>[], layout: Partial<Plotly.Layout>, config: Partial<Plotly.Config>,  zoomEnabled: boolean = false){    const plotElement = document.getElementById(elementId);
    if (!plotElement) {
      console.error(`Plot element "${elementId}" not found in DOM.`);
      return;
    }

    try {
      this.zoomEnabled = zoomEnabled;
      this.chart = await Plotly.newPlot(plotElement, traces, layout, config);
    } catch (err) {
      console.error('Error creating Plotly chart:', err);
    }
  }

  toggleZoom(elementId: string) {
    if (!this.chart) {
      console.error('Chart is not initialized.');
      return;
    }

    const plotElement = document.getElementById(elementId);
    this.zoomEnabled = !this.zoomEnabled;
    if(this.chart) {
      const dragMode = this.zoomEnabled ? 'zoom' :  false;
      Plotly.relayout(this.chart, {dragmode: dragMode});
    }
  }
}
