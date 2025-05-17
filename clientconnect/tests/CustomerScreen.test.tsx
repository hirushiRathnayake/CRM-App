// __tests__/CustomerScreen.test.tsx

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomerScreen from '../app/(customer)/customerList'; // adjust path
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

// Mock redux hooks
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

// Mock router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock CustomerList component
jest.mock('../../components/customer/customerList', () => {
  return ({ customers, onCustomerPress }: any) => {
    return (
      <>
        {customers.map((cust: any) => (
          <Text
            key={cust._id}
            onPress={() => onCustomerPress(cust)}
            testID={`customer-${cust._id}`}
          >
            {cust.name}
          </Text>
        ))}
      </>
    );
  };
});

// Mock Header and BottomNavBar (simple placeholders)
jest.mock('../../components/common/header', () => () => <></>);
jest.mock('@/components/common/bottomNavbar', () => () => <></>);

import { Text } from 'react-native';

describe('CustomerScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchCustomers on mount and when filters change', () => {
    const customers = [
      { _id: '1', name: 'Alice', status: 'Active', opportunityType: 'New' },
      { _id: '2', name: 'Bob', status: 'Inactive', opportunityType: 'Existing' },
    ];
    const filters = { searchQuery: '', statusFilter: 'All', opportunityType: '' };
    ((useSelector as unknown) as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === '') {
        // Trick to detect customers slice selector
        return { customers, loading: false, error: null };
      }
      if (selectorFn.toString().includes('state.filters')) {
        return filters;
      }
      return {};
    });

    render(<CustomerScreen />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // thunk fetchCustomers
  });

  it('filters customers based on filters and shows filtered list', () => {
    const customers = [
      { _id: '1', name: 'Alice', status: 'Active', opportunityType: 'New' },
      { _id: '2', name: 'Bob', status: 'Inactive', opportunityType: 'Existing' },
    ];
    const filters = { searchQuery: 'ali', statusFilter: 'All', opportunityType: '' };
    ((useSelector as unknown) as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === '') {
        return { customers, loading: false, error: null };
      }
      if (selectorFn.toString().includes('state.filters')) {
        return filters;
      }
      return {};
    });

    const { queryByTestId } = render(<CustomerScreen />);
    expect(queryByTestId('customer-1')).toBeTruthy(); // Alice matches "ali"
    expect(queryByTestId('customer-2')).toBeNull(); // Bob filtered out
  });

  it('dispatches setFilters on text input change', () => {
    const filters = { searchQuery: '', statusFilter: 'All', opportunityType: '' };
    ((useSelector as unknown) as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === '') {
        return { customers: [], loading: false, error: null };
      }
      if (selectorFn.toString().includes('state.filters')) {
        return filters;
      }
      return {};
    });

    const { getByPlaceholderText } = render(<CustomerScreen />);
    const input = getByPlaceholderText('Filter by name or status');
    fireEvent.changeText(input, 'new search');

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setFilters',
      payload: { ...filters, searchQuery: 'new search' },
    });
  });

  it('shows loading and error messages', () => {
    ((useSelector as unknown) as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === '') {
        return { customers: [], loading: true, error: 'Failed to load' };
      }
      if (selectorFn.toString().includes('state.filters')) {
        return { searchQuery: '', statusFilter: 'All', opportunityType: '' };
      }
      return {};
    });

    const { getByText } = render(<CustomerScreen />);
    expect(getByText('Loading customers...')).toBeTruthy();
    expect(getByText('Error: Failed to load')).toBeTruthy();
  });

  it('navigates to customerDetails on customer press', () => {
    const customers = [
      { _id: '1', name: 'Alice', status: 'Active', opportunityType: 'New' },
    ];
    const filters = { searchQuery: '', statusFilter: 'All', opportunityType: '' };
    ((useSelector as unknown) as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === '') {
        return { customers, loading: false, error: null };
      }
      if (selectorFn.toString().includes('state.filters')) {
        return filters;
      }
      return {};
    });

    const { getByTestId } = render(<CustomerScreen />);
    fireEvent.press(getByTestId('customer-1'));
    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/customerDetails',
      params: { customerId: '1' },
    });
  });
});
