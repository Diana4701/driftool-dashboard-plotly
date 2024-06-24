import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {HttpClient} from "@angular/common/http";
import {RepositoryData} from "../repository-data";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CsvDataService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient, private papa: Papa) {
    this.loadData();
  }

  /*loadData(csvFile: string) {
    return new Promise<RepositoryData[]>((resolve, reject) => {
      this.http.get(csvFile, {responseType: 'text'}).subscribe(
        (csvData) => {
          this.papa.parse(csvData, {
            header: true,
            delimiter: ';',
            complete: (result) => {
              this.data = result.data;
              resolve(this.data)
            }
          })
        });
    });
  }*/



  // for the timeseries_different.csv

  loadData() {
    this.http.get('/assets/timeseries_different.csv', { responseType: 'text' })
      .subscribe(data => {
        const parsedData = this.parseCsvData(data);
        this.dataSubject.next(parsedData);
      });
  }
  private parseCsvData(csvData: string): any[] {
    const parsed = this.papa.parse(csvData, { header: true, delimiter: ';', skipEmptyLines: true });
    const transformedData: any[] = [];

    parsed.data.forEach((row: any) => {
      const repository = row.Repository;
      Object.keys(row).forEach(key => {
        if (key !== 'Repository') {
          transformedData.push({
            timestamp: key,
            repository: repository,
            value: parseFloat(row[key].replace(',', '.'))
          });
        }
      });
    });

    return transformedData;
  }
}
