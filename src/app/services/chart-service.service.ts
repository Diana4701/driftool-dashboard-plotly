import { Injectable } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chart: Plotly.PlotlyHTMLElement | null = null;

  constructor() { }

  async createChart(elementId: string, traces: Partial<Plotly.ScatterData>[], layout: Partial<Plotly.Layout>, config: Partial<Plotly.Config>) {
    const plotElement = document.getElementById(elementId);
    if (!plotElement) {
      console.error(`Plot element "${elementId}" not found in DOM.`);
      return;
    }

    try {
      this.chart = await Plotly.newPlot(plotElement, traces, layout, config);
    } catch (err) {
      console.error('Error creating Plotly chart:', err);
    }
  }

  toggleZoom(elementId: string, zoomEnabled: boolean) {
    if (!this.chart) {
      console.error('Chart is not initialized.');
      return;
    }

    Plotly.relayout(this.chart, { dragmode: zoomEnabled ? 'zoom' : false });
  }
}
