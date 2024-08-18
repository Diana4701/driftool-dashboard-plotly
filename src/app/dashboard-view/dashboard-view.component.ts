
import {Component, OnInit} from '@angular/core';
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
  constructor(private featuresService: FeatureToggleService,
              private router: Router,
              private csvService: CsvDataService
  ) {}

  ngOnInit() {
    this.featuresService.checkboxes$.subscribe((data: CheckboxState) => {
      this.checkboxes = data;
    });
    this.featuresService.getCheckedFeatures().subscribe(checkedCheckboxes => {
      this.checkedCheckboxes = checkedCheckboxes;
    });

    this.csvService.data$.subscribe((data: DataItem[]) => {
      this.data = data;
    });


    this.featuresService.selectedTimePeriod$.subscribe((timePeriod) => {
      this.selectedTimePeriod = timePeriod;
    });


  }


  isSelected(name: string): boolean {
    return this.checkboxes[name]?.checked;
  }


  navigateToConfig() {
    this.router.navigate(['/config']);
  }



}
