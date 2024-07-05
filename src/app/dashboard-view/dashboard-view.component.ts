// dashboard-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CheckboxService } from '../services/feature-toggle.service';
import { Router } from "@angular/router";
import { CheckboxState, CheckboxOption } from '../models/model';
import {NgForOf, NgIf} from "@angular/common";
import {TimeComponent} from "../features/time/time.component";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, TimeComponent],
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  checkboxes: CheckboxState = {};
  checkedCheckboxes: CheckboxOption[] = [];

  constructor(private checkboxService: CheckboxService, private router: Router) {}

  ngOnInit() {
    this.checkboxService.checkboxes$.subscribe((data: CheckboxState) => {
      this.checkboxes = data;
      this.updateCheckedCheckboxes();
    });
  }

  updateCheckedCheckboxes() {
    this.checkedCheckboxes = Object.keys(this.checkboxes)
      .filter(key => this.checkboxes[key].checked)
      .map(key => ({ label: this.checkboxes[key].label, value: key }));
  }

  isSelected(name: string): boolean {
    return this.checkboxes[name]?.checked;
  }

  isValidSelection(): boolean {
    // Customize based on your specific logic for validity
    const hasTimeSelected = this.isSelected('last_three_days') || this.isSelected('first_three_days') || this.isSelected('last_week');
    const hasOperationSelected = this.isSelected('average') || this.isSelected('sum');
    return hasTimeSelected && hasOperationSelected;
  }

  navigateToConfig() {
    this.router.navigate(['/config']);
  }
}
