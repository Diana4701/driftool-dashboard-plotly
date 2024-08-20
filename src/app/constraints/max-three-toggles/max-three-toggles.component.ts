import { Component } from '@angular/core';
import {CheckboxState} from "../../models/toggles-models";
import {AnalysisStrategy} from "../../strategies/analysis-strategy";

@Component({
  selector: 'app-max-three-toggles',
  standalone: true,
  imports: [],
  templateUrl: './max-three-toggles.component.html',
  styleUrl: './max-three-toggles.component.css'
})



export class MaxThreeTogglesComponent /*implements AnalysisStrategy*/ {
 /* execute(checkboxes: CheckboxState): void {
  
    const selectedCount = Object.values(checkboxes).filter(option => option.checked).length;
    if (selectedCount > 3) {
      console.log('You can select a maximum of three checkboxes');
    }
  }*/
}
