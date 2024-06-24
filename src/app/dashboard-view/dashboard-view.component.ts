import {Component, OnInit} from '@angular/core';
import {CsvDataService} from "../services/csv-data.service";
import {FeatureToggleService} from "../services/feature-toggle.service";
import {RepositoryData} from "../repository-data";
import moment from 'moment';
import * as Plotly from 'plotly.js-dist-min';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ConfigService} from "../services/config.service";
import {Configuration} from "../configuration";
import {NgIf} from "@angular/common";
import {FeatureFlagDirective} from "../feature-flag.directive";
import {TimeComponent} from "../features/time/time.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    FeatureFlagDirective,
    TimeComponent
  ],
  providers: [CsvDataService, FeatureToggleService, HttpClient, ConfigService, TimeComponent],
  template: `<div>
    <h1>Dashboard</h1>
    <div *appFeatureToggle="{ category: 'time', name: 'last_week' }">
      <h2>Last Week Feature is Enabled! (Directive)</h2>
      <!--<app-time></app-time>-->
  </div>
    <!-- Add other feature toggle views as needed -->
  <div *ngIf="lastWeekEnabled">
    <h2>Last Week Feature is Enabled!</h2>
    <!-- Additional content for the "last_week" feature -->
  </div>
    <button (click)="navigateToConfig()">Go to Configuration</button>
  </div>
  `,
  styleUrls: ['./dashboard-view.component.css']
})


export class DashboardViewComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  lastWeekEnabled: boolean = false;


  constructor(
    private csvDataService: CsvDataService,
    private featureToggleService: FeatureToggleService,
    private router: Router
    ) {
  }

  isFeatureEnabled(category: string, featureName: string): boolean {
    return this.featureToggleService.isFeatureEnabled(category, featureName);
  }

  ngOnInit() {
    console.log('Dashboard ngOnInit called');
    this.loadDataAndFilter();
   /* this.featureTogglesService.featureToggles$.subscribe(config => {
        this.config = config;
        console.log('Dashboard feature toggles config:',this.config);
        this.loadDataAndFilter()
    });*/


      console.log('Dashboard ngOnInit called');
      this.featureToggleService.featureToggles$.subscribe(() => {
        this.lastWeekEnabled = this.featureToggleService.isFeatureEnabled('time', 'last_week');
        console.log(`Last week feature is ${this.lastWeekEnabled ? 'enabled' : 'disabled'}`);

      });
      this.isFeatureEnabled('time', 'last_week');
    }

  loadDataAndFilter(){
    this.csvDataService.data$.subscribe(data => {
      console.log('Loaded data: ', data);
      this.data = data;
    });
  }

  navigateToConfig() {
    this.router.navigate(['']);
  }
    /* this.csvDataService.loadData('../assets/timeseries_different.csv').then(data => {
       this.data = data;
       console.log('Loaded data:', this.data);
       this.featureTogglesService.featureToggles$.subscribe(config => {
         if (config) {
           this.filterData(config);
         }
       });
     })
   }*/


    filterData()
    {
      /*if (!this.config) {
        console.log('Config is not loaded yet.');
        return;
      }*/
     // console.log('filterData called with config:', this.config);
     /* const timeFeature = this.config.features.time.options.find((option: any) => option.enabled);
      if (!timeFeature) {
        console.log('No time feature is enabled.');
        return;
      }

      console.log('filterData called with config:', this.config);
      console.log('Time feature:', timeFeature);

      const now = moment();
      let filteredData: any[] = [];

      if (timeFeature.name === 'last_week') {
        const lastWeek = now.clone().subtract(7, 'days');
        filteredData = this.data.filter(entry => moment(entry.timestamp, 'DD.MM.YYYY').isAfter(lastWeek));
      } else if (timeFeature.name === 'last_month') {
        const lastMonth = now.clone().subtract(1, 'month');
        filteredData = this.data.filter(entry => moment(entry.timestamp, 'DD.MM.YYYY').isAfter(lastMonth));
      }

      this.filteredData = filteredData;
      console.log('Filtered data:', this.filteredData);
      this.plotData();*/
    }


    plotData()
    {
      const plotlyData: Partial<Plotly.Data>[] = [];

      const repositories = this.filteredData.reduce((acc: any, item: any) => {
        if (!acc[item.repository]) {
          acc[item.repository] = { x: [], y: [], type: 'scatter', mode: 'lines', name: item.repository };
        }
        acc[item.repository].x.push(item.timestamp);
        acc[item.repository].y.push(item.value);
        return acc;
      }, {});

      for (const repo in repositories) {
        plotlyData.push(repositories[repo]);
      }

      const layout = {
        title: 'Filtered Data Plot',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Value' }
      };

      Plotly.newPlot('plot', plotlyData, layout).then(() => {
        console.log('Plot created with data:', plotlyData);
      }).catch(err => {
        console.error('Error creating plot:', err);
      });
    }




}
