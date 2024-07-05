import { Component, Input, OnInit } from '@angular/core';
import { CsvDataService } from "../../services/csv-data.service";
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {SumComponent} from "../sum/sum.component";
import {AverageComponent} from "../average/average.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {DeviationComponent} from "../deviation/deviation.component";
import {VarianceComponent} from "../variance/variance.component";

@Component({
  selector: 'app-time-period',
  standalone: true,
  templateUrl: './time.component.html',
  imports: [
    SumComponent,
    AverageComponent,
    NgIf,
    AsyncPipe,
    DeviationComponent,
    VarianceComponent
  ],
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  @Input() operation: string = '';
  @Input() timePeriod: string = '';

  lastTimePeriodData$ = new BehaviorSubject<any[]>([]);

  constructor(private dataService: CsvDataService) {}

  ngOnInit() {
    this.dataService.data$
      .pipe(filter(data => !!data)) // Filter out undefined or null data
      .subscribe(data => {
        const filteredData = this.getTimePeriodData(data, this.timePeriod);
        this.lastTimePeriodData$.next(filteredData);
      });
  }

  getTimePeriodData(data: any[], period: string): any[] {
    if (!data || data.length === 0) {
      return []; // Handle empty data gracefully
    }

    const now = new Date();
    let pastDate = new Date(now); // Clone the current date

    switch (period) {
      case 'last_three_days':
        pastDate.setDate(now.getDate() - 3);
        return data.filter(item => new Date(item.timestamp) >= pastDate);
      case 'first_three_days':
        const startDate = new Date(data[0].timestamp); // Ensure data[0] exists
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 3);
        return data.filter(item => new Date(item.timestamp) >= startDate && new Date(item.timestamp) <= endDate);
      case 'last_week':
        pastDate.setDate(now.getDate() - 7);
        return data.filter(item => new Date(item.timestamp) >= pastDate);
      default:
        pastDate.setDate(now.getDate() - 3); // Default to last three days
        return data.filter(item => new Date(item.timestamp) >= pastDate);
    }
  }
}
