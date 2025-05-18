import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilterScreen from '../app/(filters)/filter'; // Adjust the import path

// Mocks for useRouter from expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Create a mock store
const mockStore = configureStore([]);

describe('FilterScreen', () => {
  let store: ReturnType<typeof mockStore>;
  let component: ReturnType<typeof render>;
  let router;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

   
    const useRouter = require('expo-router').useRouter;
    router = useRouter();

    component = render(
      <Provider store={store}>
        <FilterScreen />
      </Provider>
    );
  });

  it('renders all inputs and button', () => {
    const { getByPlaceholderText, getByText } = component;

    expect(getByPlaceholderText('Enter name...')).toBeTruthy();
    expect(getByText('Status')).toBeTruthy();
    expect(getByText('Apply Filters')).toBeTruthy();
  });

  it('updates name input value on change', () => {
    const { getByPlaceholderText } = component;
    const nameInput = getByPlaceholderText('Enter name...');

    fireEvent.changeText(nameInput, 'John Doe');
    expect(nameInput.props.value).toBe('John Doe');
  });

  it('changes picker value on selection', () => {
    const { getByTestId } = component;
    // Add testID to Picker for easier querying in real code if needed
    // but here we can find by label instead
  });

  it('dispatches setFilters action and navigates on button press', () => {
    const { getByText, getByPlaceholderText } = component;
    const applyButton = getByText('Apply Filters');
    const nameInput = getByPlaceholderText('Enter name...');

    // Update input
    fireEvent.changeText(nameInput, 'Alice');

    // Press the button
    fireEvent.press(applyButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'filter/setFilters',
      payload: {
        searchQuery: 'Alice',
        statusFilter: 'All',
        opportunityType: '',
      },
    });

    expect(router.push).toHaveBeenCalledWith('/customerList');
  });
});
