import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent implements OnInit{
  @Input() timePeriod1!: string;
  @Input() timePeriod2!: string;
  @Input() operation!: string;

  ngOnInit() {
    // Implement the logic to compare the two time periods
  }
}
