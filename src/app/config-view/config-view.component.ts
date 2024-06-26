import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxService } from '../services/feature-toggle.service';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './config-view.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./config-view.component.css']
})
export class ConfigViewComponent implements OnInit {
  checkboxData: { name: string, label: string }[] = [];
  checkboxes: { [key: string]: boolean } = {};


  constructor(protected router: Router, protected checkboxService: CheckboxService) {
  }

  ngOnInit() {
    this.checkboxService.loadCheckboxes().subscribe(data => {
      this.checkboxData = data;
      const currentCheckboxes = this.checkboxService.getCheckboxes();
      // Initialize checkboxes based on current state
      this.checkboxData.forEach(checkbox => {
        this.checkboxes[checkbox.name] = currentCheckboxes[checkbox.name]?.checked || false;
      });
    });
  }

  onSubmit() {
    const checkboxesData: { [key: string]: { label: string; name: string; checked: boolean } } = {};
    for (const key in this.checkboxes) {
      if (this.checkboxes.hasOwnProperty(key)) {
        checkboxesData[key] = {
          label: this.getLabelByKey(key),
          name: key,
          checked: this.checkboxes[key]
        };
      }
    }
    this.checkboxService.setCheckboxes(checkboxesData);
    this.router.navigate(['/dashboard']);
  }

   getLabelByKey(key: string): string {
    const checkbox = this.checkboxData.find(item => item.name === key);
    return checkbox ? checkbox.label : '';
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

}
