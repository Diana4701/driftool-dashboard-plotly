import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CsvDataService } from "../../services/csv-data.service";
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import {SumComponent} from "../sum/sum.component";
import {AverageComponent} from "../average/average.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {DeviationComponent} from "../deviation/deviation.component";
import {DriftComponent} from "../drift/drift.component";
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
    DriftComponent,
    NgForOf
  ],
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnChanges {
  @Input() operation: string = '';
  @Input() timePeriod: string = '';
  @Input() timePeriodLabels: { [key: string]: string } = {};
  lastTimePeriodData$ = new BehaviorSubject<DataItem[]>([]);

  constructor(private dataService: CsvDataService) {}

  ngOnInit() {
    // Debugging statements to check inputs
    console.log('Operation Input:', this.operation);
    console.log('Time Period Input:', this.timePeriod);

this.updateData();

    // Subscribe to data and filter it based on the provided timePeriod
   /* this.dataService.data$
      .pipe(filter(data => !!data)) // Filter out undefined or null data
      .subscribe(data => {
        console.log('Received Data:', data); // Debugging statement
        const filteredData = this.getTimePeriodData(data, this.timePeriod);
        this.lastTimePeriodData$.next(filteredData);
      });*/
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timePeriod'] || changes['operation']) {
      console.log('Operation Input:', this.operation);
      console.log('Time Period Input:', this.timePeriod);
      this.updateData();
    }
  }

  updateData() {
    this.dataService.data$
      .pipe(filter(data => !!data)) // Filter out undefined or null data
      .subscribe(data => {
        const filteredData = this.getTimePeriodData(data, this.timePeriod);
        this.lastTimePeriodData$.next(filteredData);
        // Optionally, update additional state or trigger additional logic
      });
  }
  getTimePeriodData(data: DataItem[], period: string): DataItem[] {
    console.log('Filtering Data for Period:', period); // Debugging statement

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
          filteredData.push(...repoData.slice(-3)); // Corrected to push the first three items
          break;
        case 'first_three_days':
          filteredData.push(...repoData.slice(0,3)); // Pushes the last three items
          break;
        case 'last_week':
          filteredData.push(...repoData.slice(-5)); // Pushes the last seven items
          break;
        default:
          filteredData.push(...repoData.slice(-3)); // Default to last three days
          break;
      }
    });
    console.log('Filtered Data:', filteredData); // Debugging statement
    return filteredData;
  }
}
