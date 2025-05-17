
# React Native CRM Dashboard & Filter App

## Overview

This React Native app provides a simple yet powerful Customer Relationship Management (CRM) dashboard and filtering functionality. It displays customer and opportunity summaries with interactive charts, and allows users to filter customer data based on name and status. The app uses Redux for state management and `expo-router` for navigation.

---

## Features

* **Dashboard Overview:**

  * Displays total customers and opportunities.
  * Shows breakdown of customer status (Active, Inactive, Lead) via Pie Chart.
  * Shows opportunities overview (New, Won, Lost) with Bar Chart.
  * Summary cards with icons and colors for quick insights.
  * Responsive design with scrollable layout.

* **Filter Customers:**

  * Filter customers by name and status.
  * Status options include Lead, Active, Inactive.
  * Uses Picker dropdown for status selection.
  * Applies filters to update customer list.
  * Navigation to filtered customer list screen.

* **State Management:**

  * Redux slices for managing dashboard summary and filter state.
  * Dispatch actions to fetch data and set filters.

* **Reusable Components:**

  * Header component for consistent page titles.
  * Bottom navigation bar.

---

## Used Packages

| Package                                    | Purpose                                      |
| ------------------------------------------ | -------------------------------------------- |
| `react-native`                             | Core React Native framework                  |
| `react-redux`                              | State management using Redux                 |
| `@reduxjs/toolkit`                         | Simplified Redux development toolkit         |
| `react-native-chart-kit`                   | Charts (PieChart and BarChart) visualization |
| `@react-native-picker/picker`              | Cross-platform Picker dropdown component     |
| `react-native-vector-icons`                | Icon support using FontAwesome icons         |
| `expo-router`                              | Routing and navigation for Expo React Native |
| `redux-mock-store` (dev only)              | Redux store mock for testing                 |
| `@testing-library/react-native` (dev only) | React Native component testing               |

---

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/your-app.git
   cd your-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the app:

   ```bash
   npm start
   # or
   expo start
   ```

---

## Usage

* Open the app to view the Dashboard summary.
* Tap on filter to open the Filter screen.
* Enter a name or select a status and apply filters.
* Navigate to the filtered customer list.

---

## Project Structure

```
/components      # Reusable UI components like Header, BottomNavBar, SummaryCard
/redux           # Redux slices and store setup
/screens         # Main screens like Dashboard, FilterScreen
/App.js          # Root component (if using plain React Native)
/app            # If using expo-router for routing
```

---

## Testing

* Unit tests are written with Jest and React Native Testing Library.
* Run tests with:

  ```bash
  npm test
  ```

---

