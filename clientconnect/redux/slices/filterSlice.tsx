// redux/slices/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
  statusFilter: string;
  opportunityType: string;
}

const initialState: FilterState = {
  searchQuery: '',
  statusFilter: 'All',
  opportunityType: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterState>) {
      return action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
