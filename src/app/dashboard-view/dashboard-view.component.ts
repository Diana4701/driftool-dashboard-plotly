import {Component, OnInit} from '@angular/core';
import {CsvDataService} from "../services/csv-data.service";
import {CheckboxService} from "../services/feature-toggle.service";
import {RepositoryData} from "../repository-data";
import moment from 'moment';
import * as Plotly from 'plotly.js-dist-min';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ConfigService} from "../services/config.service";
import {Configuration} from "../configuration";
import {NgForOf, NgIf} from "@angular/common";

import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    NgForOf
  ],
  providers: [CsvDataService, CheckboxService, HttpClient, ConfigService],
  template: `
    <h2>Dashboard</h2>
    <div *ngIf="checkedCheckboxes.length > 0">
      <h3>Checked Checkboxes:</h3>
      <ul>
        <li *ngFor="let checkbox of checkedCheckboxes">
          {{ checkbox.label }}
        </li>
      </ul>
    </div>
    <div *ngIf="checkedCheckboxes.length === 0">
      <p>No checkboxes selected.</p>
    </div>
  `,
  styleUrls: ['./dashboard-view.component.css']
})


export class DashboardViewComponent implements OnInit {
  checkboxes: { [key: string]: boolean } = {};
  checkedCheckboxes: { name: string, label: string }[] = [];
  checkboxData: any[] = [];

  constructor(private checkboxService: CheckboxService) {}

  ngOnInit() {
    this.checkboxes = this.checkboxService.getCheckboxes();
    this.checkboxService.loadCheckboxes().subscribe(data => {
      this.checkboxData = data;
      this.checkedCheckboxes = this.checkboxData.filter((checkbox: any) => this.checkboxes[checkbox.name]);
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
