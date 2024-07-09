import { Component, Input, OnInit } from '@angular/core';
import { CsvDataService } from "../../services/csv-data.service";
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {SumComponent} from "../sum/sum.component";
import {AverageComponent} from "../average/average.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {DeviationComponent} from "../deviation/deviation.component";
import {VarianceComponent} from "../variance/variance.component";
import {DataItem} from "../../models/model";


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
  @Input() timePeriodLabels: { [key: string]: string } = {};
  lastTimePeriodData$ = new BehaviorSubject<DataItem[]>([]);

  constructor(private dataService: CsvDataService) {}

  ngOnInit() {
    this.dataService.data$
      .pipe(filter(data => !!data)) // Filter out undefined or null data
      .subscribe(data => {
        const filteredData = this.getTimePeriodData(data, this.timePeriod);
        this.lastTimePeriodData$.next(filteredData);
      });
  }

  getTimePeriodData(data: DataItem[], period: string): DataItem[] {
    if (!data || data.length === 0) {
      return []; // Handle empty data gracefully
    }

    const repositories = Array.from(new Set(data.map(item => item.repository)));
    const filteredData: DataItem[] = [];

    repositories.forEach(repository => {
      const repoData = data.filter(item => item.repository === repository);
      repoData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      switch (period) {
        case 'last_three_days':
          filteredData.push(...repoData.slice(-3)); // Pushes the last three items
          break;
        case 'first_three_days':
          filteredData.push(...repoData.slice(0, 3)); // Pushes the first three items
          break;
        case 'last_week':
          filteredData.push(...repoData.slice(-7)); // Pushes the last seven items
          break;
        default:
          filteredData.push(...repoData.slice(-7)); // Default to last three days
          break;
      }
    });
    return filteredData;
  }
}
