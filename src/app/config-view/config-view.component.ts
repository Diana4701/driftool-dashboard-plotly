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
  checkboxData: any[] = [];
  checkboxes: { [key: string]: boolean } = {};

  constructor(private router: Router, private checkboxService: CheckboxService) {}

  ngOnInit() {
    this.checkboxService.loadCheckboxes().subscribe(data => {
      this.checkboxData = data;
      this.checkboxData.forEach((checkbox: any) => {
        this.checkboxes[checkbox.name] = false;
      });
    });
  }

  onSubmit() {
    this.checkboxService.setCheckboxes(this.checkboxes);
    this.router.navigate(['/dashboard']);
  }
}


