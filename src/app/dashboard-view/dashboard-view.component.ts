// dashboard-view.component.ts
import {Component, Input, OnInit} from '@angular/core';
import { CheckboxService } from '../services/feature-toggle.service';
import { Router } from "@angular/router";
import {CheckboxState, CheckboxOption, DataItem} from '../models/model';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {TimeComponent} from "../features/time/time.component";
import {ComparisonComponent} from "../features/comparison/comparison.component";
import {CsvDataService} from "../services/csv-data.service";
import {VarianceComponent} from "../features/variance/variance.component";
import {Observable} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, TimeComponent, NgClass, ComparisonComponent, VarianceComponent, AsyncPipe],
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  checkboxes: CheckboxState = {};
  checkedCheckboxes: CheckboxOption[] = [];
  data: DataItem[] = [];
  defaultView: string = '';
  selectedTimePeriod: string | null = '';
  timePeriods$: Observable<string[]> = this.checkboxService.getTimePeriods();
  operations$: Observable<string[]> = this.checkboxService.getOperations();
  constructor(private checkboxService: CheckboxService,
              private router: Router,
              private csvService: CsvDataService
  ) {}

  ngOnInit() {
    this.checkboxService.checkboxes$.subscribe((data: CheckboxState) => {
      this.checkboxes = data;
    });

    this.csvService.data$.subscribe((data: DataItem[]) => {
      this.data = data;
    });


    this.checkboxService.defaultView$.subscribe(view => {
      this.defaultView = view; // Update default view when it changes
    });

    this.checkboxService.selectedTimePeriod$.subscribe((timePeriod) => {
      this.selectedTimePeriod = timePeriod;
    });
  }

 /* defaultView() {
    this.checkedCheckboxes = Object.keys(this.checkboxes)
      .filter(key => this.checkboxes[key].checked)
      .map(key => ({ label: this.checkboxes[key].label, value: key }));
  }*/


  isSelected(name: string): boolean {
    return this.checkboxes[name]?.checked;
  }


  navigateToConfig() {
    this.router.navigate(['/config']);
  }



}
