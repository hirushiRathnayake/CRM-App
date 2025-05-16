import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerStatus } from './customerSlice';

interface FilterState {
  statusFilter: CustomerStatus | 'All';
  searchQuery: string;
}

const initialState: FilterState = {
  statusFilter: 'All',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<CustomerStatus | 'All'>) {
      state.statusFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetFilters(state) {
      state.statusFilter = 'All';
      state.searchQuery = '';
    },
  },
});

export const { setStatusFilter, setSearchQuery, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
