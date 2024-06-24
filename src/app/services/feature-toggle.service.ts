import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private checkboxes: { [key: string]: boolean } = {};

  constructor(private http: HttpClient) {}

  setCheckboxes(checkboxes: { [key: string]: boolean }) {
    this.checkboxes = checkboxes;
  }

  getCheckboxes() {
    return this.checkboxes;
  }

  loadCheckboxes(): Observable<any> {
    return this.http.get('../assets/checkboxes.json');
  }
}
