// dashboard-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CheckboxService } from '../services/feature-toggle.service';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from "@angular/router";
import { TimeComponent } from "../features/time/time.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, TimeComponent],
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  checkboxes: { [key: string]: boolean } = {};
  checkedCheckboxes: { label: string, name: string, checked: boolean }[] = [];
  checkboxesData: { [key: string]: { label: string; name: string; checked: boolean } } = {};

  constructor(private checkboxService: CheckboxService, private router: Router) {}

  ngOnInit() {
    this.checkboxService.checkboxes$.subscribe(data => {
      this.checkboxesData = data;
      this.initializeCheckboxes();
      this.updateCheckedCheckboxes();
    });
  }

  initializeCheckboxes() {
    for (const key in this.checkboxesData) {
      if (this.checkboxesData.hasOwnProperty(key)) {
        this.checkboxes[key] = this.checkboxesData[key].checked;
      }
    }
  }

  updateCheckedCheckboxes() {
    this.checkedCheckboxes = Object.keys(this.checkboxes)
      .filter(key => this.checkboxes[key])
      .map(key => this.checkboxesData[key]);
  }

  isSelected(name: string): boolean {
    return this.checkedCheckboxes.some(cb => cb.name === name);
  }

  isValidSelection(): boolean {
    const hasTimeSelected = this.isSelected('last_three_days') || this.isSelected('last_seven_days');
    const hasOperationSelected = this.isSelected('sum') || this.isSelected('average');
    return hasTimeSelected && hasOperationSelected;
  }

  navigateToConfig() {
    this.router.navigate(['/config']);
  }
}
