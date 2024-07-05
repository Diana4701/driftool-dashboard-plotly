import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckboxOption, CheckboxState, ConfigSection } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private localStorageKey = 'checkboxesState';
  private checkboxesSubject = new BehaviorSubject<CheckboxState>({});
  checkboxes$ = this.checkboxesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPersistedState();
  }

  setCheckboxes(checkboxes: CheckboxState) {
    this.checkboxesSubject.next(checkboxes);
    this.persistState(checkboxes);
  }

  getCheckboxes(): CheckboxState {
    return this.checkboxesSubject.value;
  }

  loadCheckboxes(): Observable<ConfigSection[]> {
    return this.http.get<ConfigSection[]>('../assets/checkboxes.json');
  }

  resetCheckboxes() {
    const resetState: CheckboxState = {};
    Object.keys(this.checkboxesSubject.value).forEach(key => {
      resetState[key] = {
        ...this.checkboxesSubject.value[key],
        checked: false
      };
    });
    this.setCheckboxes(resetState);
  }



  validateConstraints(checkboxes: CheckboxState, selectedTimePeriod: string | null): { isValid: boolean, message: string } {
    const timePeriodSelected = selectedTimePeriod !== null;
    const selectedCheckboxes = Object.values(checkboxes).filter(option => option.checked).length;

    if (!timePeriodSelected) {
      return { isValid: false, message: 'Please select a time period.' };
    }
    if (selectedCheckboxes > 4) {
      return { isValid: false, message: 'You can select a maximum of 3 checkboxes.' };
    }
    return { isValid: true, message: '' };
  }

  private persistState(state: CheckboxState) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(state));
  }

  private loadPersistedState() {
    const persistedState = localStorage.getItem(this.localStorageKey);
    if (persistedState) {
      this.checkboxesSubject.next(JSON.parse(persistedState));
    }
  }
}
