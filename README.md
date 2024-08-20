
# driftool-dashboard-plotly

# DashboardPlotlyProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2. 

## Current status

### Features Implemented

- **Sum Calculation**: The application supports calculating the sum of data items using the `SumStrategyComponent`. This feature aggregates values across the provided dataset.

- **Average Calculation**: The application supports calculating the average of data items using the `AverageStrategyComponent`. This feature computes the mean value from the dataset.

- **Last Three Days Feature**: The application includes functionality to analyze data for the last three days using the `TimePeriodStrategyComponent`. This feature filters and processes data from the most recent three days.

### Limitations

- **Constraints on Number of Charts**: The current implementation does not impose any constraints on the maximum number of charts that can be generated. 

- **Time Option Selection**: Users must select a time interval to view the calculated statement drift measures, whether it be the average, sum, or other metrics.

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
    - Utilize the reset functionality within the application to clear all selected settings in the configuration panel and revert to the default configuration (fully working in Feature Flags approach).
    - 
## Future Enhancements

- **Adding Constraints**: Implement functionality to limit the number of charts displayed and manage system performance.

- **Enhanced Time Selection**: Introduce more flexible time selection options for finer control over the data period.

- **Interactive Controls**: Develop additional interactive features for real-time chart customization and data manipulation.




