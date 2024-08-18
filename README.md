
# driftool-dashboard-plotly

# Dynamic Dashboard with Feature Flags Approach

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2. The dashboard leverages a feature flags approach to enable and disable certain functionalities dynamically based on configuration settings.

### Current Status

Due to time constraints, only a subset of the intended features has been implemented and is functional. The features currently available are:

- **Last Three Days Analysis:** The dashboard supports displaying data for the last three days.
- **Last Five Days Analysis:** The dashboard supports displaying data for the last five days.
- **Sum Values:** The sum of specific data points is calculated and displayed.
- **Average Values:** The average of selected data metrics is calculated and visualized.
- **Original Statement Drift Values:** The dashboard can show the original statement drift values from the `driftool` features.

These functionalities represent the core capabilities of the dashboard, with plans for further features to be added or toggled using the feature flags system in future iterations.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

