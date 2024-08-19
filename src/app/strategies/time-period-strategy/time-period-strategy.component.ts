import {Component, Injectable} from '@angular/core';
import {DataItem} from "../../models/toggles-models";
import {TimePeriodStrategy} from "../analysis-strategy";

@Component({
  selector: 'app-time-period-strategy',
  standalone: true,
  imports: [],
  providers: [TimePeriodStrategyComponent],
  templateUrl: './time-period-strategy.component.html',
  styleUrl: './time-period-strategy.component.css'
})
export class TimePeriodStrategyComponent implements TimePeriodStrategy {
  execute(data: DataItem[], timePeriod: string): DataItem[] {
    return this.getTimePeriodData(data, timePeriod);
      }

  getTimePeriodData(data: DataItem[], period: string): DataItem[] {
    if (!data || data.length === 0) {
      return [];
    }

    const repositories = Array.from(new Set(data.map(item => item.repository)));
    const filteredData: DataItem[] = [];

    repositories.forEach(repository => {
      const repoData = data.filter(item => item.repository === repository);
      repoData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      switch (period) {
        case 'last_three_days':
          filteredData.push(...repoData.slice(-3));
          break;
        case 'first_three_days':
          filteredData.push(...repoData.slice(0, 3));
          break;
        case 'last_week':
          filteredData.push(...repoData.slice(-7));
          break;
        case 'all_weeks':
          filteredData.push(...repoData);
          break;
        default:
          filteredData.push(...repoData);
          break;
      }
    });
    return filteredData;
  }
}
