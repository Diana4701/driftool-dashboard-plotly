import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckboxOption, CheckboxState, ConfigSection } from '../models/model';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  private localStorageKey = 'checkboxesState';
  private sessionStorageKey = 'checkboxesStateSession';
  private checkboxesSubject = new BehaviorSubject<CheckboxState>({});
  checkboxes$ = this.checkboxesSubject.asObservable();

  private configSubject = new BehaviorSubject<ConfigSection[]>([]);
  config$ = this.configSubject.asObservable();

  private defaultViewSubject = new BehaviorSubject<string>(''); // BehaviorSubject for default view
  defaultView$ = this.defaultViewSubject.asObservable(); // Observable to subscribe to default view changes

  private selectedTimePeriodSubject = new BehaviorSubject<string | null>(null);
  selectedTimePeriod$ = this.selectedTimePeriodSubject.asObservable();

  constructor(private configService: ConfigService) {
    this.initializeState();
    this.loadConfig();
  }


  loadConfig() {
    this.configService.config$.subscribe(config => {
      this.configSubject.next(config);
    });
  }
  setCheckboxes(checkboxes: CheckboxState) {
    this.checkboxesSubject.next(checkboxes);
    this.persistState(checkboxes);
  }

  getCheckboxes(): CheckboxState {
    return this.checkboxesSubject.value;
  }

  setSelectedTimePeriod(timePeriod: string | null) {
    this.selectedTimePeriodSubject.next(timePeriod);
  }

  getSelectedTimePeriod(): string | null {
    return this.selectedTimePeriodSubject.value;
  }

  getCheckedFeatures(): Observable<CheckboxOption[]> {
    return this.checkboxes$.pipe(
      map(checkboxes => Object.keys(checkboxes)
        .filter(key => checkboxes[key].checked)
        .map(key => ({
          label: checkboxes[key].label,
          value: key,
          operation: checkboxes[key].operation
        }))
      )
    );
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
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(state));
  }

  private initializeState() {
    const sessionState = sessionStorage.getItem(this.sessionStorageKey);
    if (sessionState) {
      this.checkboxesSubject.next(JSON.parse(sessionState));
    } else {
      this.checkboxesSubject.next({});
      localStorage.removeItem(this.localStorageKey);
    }
    this.setDefaultView();
  }


  setDefaultView() {
    const checkboxes = this.checkboxesSubject.value;
    const defaultView = Object.keys(checkboxes).length === 0 ? 'dashboard' : '';
    this.defaultViewSubject.next(defaultView);
  }
}
