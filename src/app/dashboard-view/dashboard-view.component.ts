// dashboard-view.component.ts
import {Component, Input, OnInit} from '@angular/core';
import { FeatureToggleService } from '../services/feature-toggle.service';
import { Router } from "@angular/router";
import {CheckboxState, CheckboxOption, DataItem} from '../models/model';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TimeComponent} from "../features/time/time.component";
import {ComparisonComponent} from "../features/comparison/comparison.component";
import {CsvDataService} from "../services/csv-data.service";
import {DriftComponent} from "../features/drift/drift.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, TimeComponent, NgClass, ComparisonComponent, DriftComponent],
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  checkboxes: CheckboxState = {};
  checkedCheckboxes: CheckboxOption[] = [];
  data: DataItem[] = [];
  defaultView: string = '';
  selectedTimePeriod: string | null = '';
  constructor(private checkboxService: FeatureToggleService,
              private router: Router,
              private csvService: CsvDataService
  ) {}

  ngOnInit() {
    this.checkboxService.checkboxes$.subscribe((data: CheckboxState) => {
      this.checkboxes = data;
      this.updateCheckedCheckboxes();
      this.updateDefaultView();
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


  updateCheckedCheckboxes() {
    this.checkedCheckboxes = Object.keys(this.checkboxes)
      .filter(key => this.checkboxes[key].checked)
      .map(key => {
        console.log(`Checkbox Key: ${key}, Value: ${this.checkboxes[key].value}, Operation: ${this.checkboxes[key].operation}`);
        return {
          label: this.checkboxes[key].label,
          value: key,
          operation: this.checkboxes[key].operation
        };
      });
  }

  updateDefaultView() {
    if (Object.values(this.checkboxes).some(checkbox => checkbox.checked)) {
      this.defaultView = ''; // Or some other appropriate value
    } else {
      this.defaultView = 'dashboard'; // Show default view if no checkboxes selected
    }
  }


  isSelected(name: string): boolean {
    return this.checkboxes[name]?.checked;
  }


  navigateToConfig() {
    this.router.navigate(['/config']);
  }



}
