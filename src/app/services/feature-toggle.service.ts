import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private localStorageKey = 'checkboxesState';
  private checkboxesSubject = new BehaviorSubject<{ [key: string]: { label: string; name: string; checked: boolean } }>({});
  checkboxes$ = this.checkboxesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPersistedState();
  }

  setCheckboxes(checkboxes: { [key: string]: { label: string; name: string; checked: boolean } }) {
    this.checkboxesSubject.next(checkboxes);
    this.persistState(checkboxes);
  }

  getCheckboxes(): { [key: string]: { label: string; name: string; checked: boolean } } {
    return this.checkboxesSubject.value;
  }

  loadCheckboxes(): Observable<{ name: string, label: string }[]> {
    return this.http.get<{ name: string, label: string }[]>('../assets/checkboxes.json');
  }

  private persistState(state: { [key: string]: { label: string; name: string; checked: boolean } }) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(state));
  }

  private loadPersistedState() {
    const persistedState = localStorage.getItem(this.localStorageKey);
    if (persistedState) {
      this.checkboxesSubject.next(JSON.parse(persistedState));
    }
  }
}
