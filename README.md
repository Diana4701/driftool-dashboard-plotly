
# driftool-dashboard-plotly

# Dynamic Dashboard with Feature Flags Approach

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2. The feature-oriented dashboard leverages a feature flags approach to enable and disable certain functionalities dynamically based on configuration settings.  
To validate the concept, a prototype dashboard has been developed using Angular CLI, Plotly.js. The dashboard is implemented with feature flags approach and as second comparative method with strategy pattern concept. The prototype implements the core features described above, focusing on the drift metric. Users can toggle between different features, allowing them to see how the dashboard can be configured to meet their specific needs. The prototype demonstrates how the initially defined user stories can be fulfilled, providing a solid foundation for future development.
### Current Status (Feature Flags)

Due to time constraints, only a subset of the intended features has been implemented and is functional. The features currently available are:

- **Last Three Days Analysis:** The dashboard supports displaying data for the last three days.
- **Last Five Days Analysis:** The dashboard supports displaying data for the last five days.
- **Sum Values:** The sum of specific data points is calculated and displayed.
- **Average Values:** The average of selected data metrics is calculated and visualized.
- **Original Statement Drift Values:** The dashboard can show the original statement drift values from the `driftool` features.
- **Constraints:** All predefined constraints have been fully implemented.
- **Interactive Features:** The dashboard includes a zoom feature in the average chart.

These functionalities represent the core capabilities of the dashboard, with plans for further features to be added or toggled using the feature flags system in future iterations.

## Current status (Strategy Pattern)

### Features Implemented

- **Sum Calculation**: The application supports calculating the sum of data items using the `SumStrategyComponent`. This feature aggregates values across the provided dataset.

- **Average Calculation**: The application supports calculating the average of data items using the `AverageStrategyComponent`. This feature computes the mean value from the dataset.

- **Last Three Days Feature**: The application includes functionality to analyze data for the last three days using the `TimePeriodStrategyComponent`. This feature filters and processes data from the last three days in a csv time series data file.

### Limitations

- **Constraints on Number of Charts**: The current implementation does not impose any constraints on the maximum number of charts that can be generated. 

- **Time Option Selection**: Users must select a time interval to view the calculated statement drift measures, whether it be the average, sum, or other metrics.


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

- **Interactive Features**: The current implementation does not include interactive features for controlling or customizing charts beyond what is provided by the Plotly.js framework. 

## How to Use

1. **Extract the Zip File**:
    - Unzip the provided file to a directory of your choice.

2. **Install Dependencies**:
    - Open a terminal or command prompt.
    - Navigate to the unzipped project directory.
    - Run `npm install` to install all necessary dependencies.

3. **Configuration**:
    - Open the application in your preferred code editor.
    - Configure feature flags via the configuration view. You can choose to calculate the sum or average of the data and select the time period for analysis.

4. **Running the Application**:
    - Run `ng serve` in the terminal to start the development server.
    - Navigate to `http://localhost:4200/` in your web browser to view the dashboard.

5. **Viewing Data**:
    - Use the dashboard view to see the visualizations based on the selected toggles.

6. **Resetting Settings**:
    - Utilize the reset functionality within the application to clear all selected settings in the configuration panel and revert to the default configuration (fully working in Feature Flags appraoch).


