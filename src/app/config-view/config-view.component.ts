import { Component, OnInit } from '@angular/core';
import { CheckboxService } from '../services/feature-toggle.service';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CheckboxState, CheckboxOption, ConfigSection} from "../models/model";




@Component({
  selector: 'app-config',
  templateUrl: './config-view.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./config-view.component.css']
})
export class ConfigViewComponent implements OnInit {
  configSections: ConfigSection[] = [];
  checkboxes: CheckboxState = {};
  timeSelected: boolean = false;
  selectedTimePeriod: string | null = null;
  validationMessage: string = '';
  isValid: boolean = false;

  constructor(private router: Router, private checkboxService: CheckboxService) {}

  ngOnInit() {
    this.checkboxService.loadCheckboxes().subscribe((data: ConfigSection[]) => {
      this.configSections = data;
      this.initializeCheckboxes();
      this.updateValidation();
    });
  }

  initializeCheckboxes() {
    const persistedCheckboxes = this.checkboxService.getCheckboxes();
    this.configSections.forEach(section => {
      section.options.forEach(option => {
        if (!this.checkboxes[option.value]) {
          this.checkboxes[option.value] = {
            value: option.value,
            label: option.label,
            checked: persistedCheckboxes[option.value]?.checked || false
          };
        }
        if (section.name === 'timePeriodOptions' && this.checkboxes[option.value].checked) {
          this.selectedTimePeriod = option.value;
        }
      });
    });
  }

  onSubmit() {
    const validation = this.checkboxService.validateConstraints(this.checkboxes, this.selectedTimePeriod);
    if (validation.isValid) {
      this.checkboxService.setCheckboxes(this.checkboxes);
      if (this.selectedTimePeriod) {
        Object.keys(this.checkboxes).forEach(key => {
          if (this.configSections.find(section => section.name === 'timePeriodOptions')?.options.find(option => option.value === key)) {
            this.checkboxes[key].checked = (key === this.selectedTimePeriod);
          }
        });
      }
      this.router.navigate(['/dashboard']);
    } else {
      this.validationMessage = validation.message;
    }
  }

  updateValidation() {
    const validation = this.checkboxService.validateConstraints(this.checkboxes, this.selectedTimePeriod);
    this.isValid = validation.isValid;
    this.validationMessage = validation.message;
  }


  resetAllSettings() {
    this.configSections.forEach(section => {
      section.options.forEach(option => {
        this.checkboxes[option.value].checked = false;
      });
    });
    this.selectedTimePeriod = null;
    this.updateValidation();
  }
}
