
# driftool-dashboard-plotly

# DashboardPlotlyProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2. 

## Current status

### Features Implemented

- **Sum Calculation**: The application supports calculating the sum of data items using the `SumStrategyComponent`. This feature aggregates values across the provided dataset.

- **Average Calculation**: The application supports calculating the average of data items using the `AverageStrategyComponent`. This feature computes the mean value from the dataset.

- **Last Three Days Feature**: The application includes functionality to analyze data for the last three days using the `TimePeriodStrategyComponent`. This feature filters and processes data from the most recent three days.

### Limitations

- **Constraints on Number of Charts**: The current implementation does not impose any constraints on the maximum number of charts that can be generated. Users can view as many charts as their data and system resources allow.

- **Time Option Selection**: The application does not require users to select a time option to filter or display data. The `TimePeriodStrategyComponent` automatically processes data for the last three days without requiring additional time period configuration from the user.

- **Interactive Features**: The current implementation does not include interactive features for controlling or customizing charts beyond what is provided by the Plotly.js framework. Features such as interactive filtering, dynamic updates, or user-driven chart customization are not part of this implementation. The application relies on Plotly.js's built-in capabilities for chart rendering and interaction.

## How to Use

1. **Configuration**: Users can configure the data and strategy components via the configuration view. This includes setting up data and choosing whether to calculate the sum or average of the data.

2. **Viewing Data**: Navigate to the dashboard view to see the resulting charts based on the selected strategy and configuration.

3. **Resetting Settings**: Use the reset functionality to clear all selected settings and return to the default configuration.

## Future Enhancements

- **Adding Constraints**: Implement functionality to limit the number of charts displayed and manage system performance.

- **Enhanced Time Selection**: Introduce more flexible time selection options for finer control over the data period.

- **Interactive Controls**: Develop additional interactive features for real-time chart customization and data manipulation.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository-url.git

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Development Server

If you have extracted the application from a ZIP file and want to run it locally, you will need to set up the development environment. Follow these steps:

1. **Install Node.js and npm**: Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

2. **Navigate to the Project Directory**: Open your terminal or command prompt and navigate to the directory where you extracted the ZIP file:
   ```bash
   cd path/to/your-project-directory
   
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

