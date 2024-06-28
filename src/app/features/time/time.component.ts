import { Component, Input, OnInit } from '@angular/core';
import { CsvDataService } from "../../services/csv-data.service";
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {AsyncPipe, NgIf} from "@angular/common";
import { AverageComponent } from "../average/average.component";
import { SumComponent } from "../sum/sum.component";

@Component({
  selector: 'app-time-period',
  standalone: true,
  imports: [
    AsyncPipe,
    AverageComponent,
    SumComponent,
    NgIf
  ],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {
  @Input() timePeriod: string = 'threeDays'; // Default to last three days
  @Input() showSum = false;
  @Input() showAverage = false;

  // Initialize with an empty array
  lastTimePeriodData$ = new BehaviorSubject<any[]>([]);

  constructor(private dataService: CsvDataService) {}

  ngOnInit() {
    this.dataService.data$
      .pipe(
        filter(data => data != null), // Ensure data is not null
        map(data => this.getLastTimePeriodData(data, this.timePeriod))
      )
      .subscribe(filteredData => this.lastTimePeriodData$.next(filteredData));
  }

  getLastTimePeriodData(data: any[], period: string): any[] {
    const now = new Date();
    let pastDate = new Date();

    switch (period) {
      case 'threeDays':
        pastDate.setDate(now.getDate() - 3);
        break;
      case 'lastWeek':
        pastDate.setDate(now.getDate() - 7);
        break;
      case 'lastMonth':
        pastDate.setMonth(now.getMonth() - 1);
        break;
      default:
        pastDate.setDate(now.getDate() - 3); // Default to last three days
    }

    return data.filter(item => new Date(item.timestamp) >= pastDate);
  }

  onTimePeriodChange(event: any) {
    this.timePeriod = event.target.value;
    this.dataService.data$
      .pipe(
        filter(data => data != null), // Ensure data is not null
        map(data => this.getLastTimePeriodData(data, this.timePeriod))
      )
      .subscribe(filteredData => this.lastTimePeriodData$.next(filteredData));
  }
}
