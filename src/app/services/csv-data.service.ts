import {Injectable} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {HttpClient} from "@angular/common/http";
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


  loadData() {
    this.http.get('../assets/timeseries_different.csv', { responseType: 'text' })
      .subscribe(data => {
        const parsedData = this.parseCsvData(data);
        console.log('Parsed CSV Data:', parsedData);
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
