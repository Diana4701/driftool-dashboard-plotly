import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private checkboxesSubject = new BehaviorSubject<{ [key: string]: { label: string; name: string; checked: boolean } }>({});
  checkboxes$ = this.checkboxesSubject.asObservable();

  constructor(private http: HttpClient) {}

  setCheckboxes(checkboxes: { [key: string]: { label: string; name: string; checked: boolean } }) {
    this.checkboxesSubject.next(checkboxes);
  }

  getCheckboxes(): { [key: string]: { label: string; name: string; checked: boolean } } {
    return this.checkboxesSubject.value;
  }

  loadCheckboxes(): Observable<{ name: string, label: string }[]> {
    return this.http.get<{ name: string, label: string }[]>('../assets/checkboxes.json');
  }
}
