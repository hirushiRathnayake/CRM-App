import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../app/(dashboard)/dashboard';  // Adjust relative path accordingly

const mockStore = configureStore([]);

describe('Dashboard Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      dashboard: {
        summary: {
          totalCustomers: 100,
          totalOpportunities: 50,
          newOpportunities: 10,
          closedWonOpportunities: 25,
          closedLostOpportunities: 15,
          activeCustomers: 60,
          inactiveCustomers: 30,
          leadCustomers: 10,
        },
        loading: false,
        error: null,
      },
    });

    // Mock dispatch so useDispatch won't throw error
    store.dispatch = jest.fn();
  });

  it('renders the header and summary cards correctly', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Total Customers')).toBeTruthy();
    expect(screen.getByText('100')).toBeTruthy(); // totalCustomers value
    expect(screen.getByText('Total Opportunities')).toBeTruthy();
    expect(screen.getByText('50')).toBeTruthy(); // totalOpportunities value
  });

  it('shows loading indicator when loading', () => {
    store = mockStore({
      dashboard: {
        summary: null,
        loading: true,
        error: null,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('shows error message when there is an error', () => {
    store = mockStore({
      dashboard: {
        summary: null,
        loading: false,
        error: 'Network error',
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(screen.getByText('Error: Network error')).toBeTruthy();
  });
});
