import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardSummary {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  leadCustomers: number;
  totalOpportunities: number;
  newOpportunities: number;
  closedWonOpportunities: number;
  closedLostOpportunities: number;
}

interface DashboardState {
  summary: DashboardSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess(state, action: PayloadAction<DashboardSummary>) {
      state.summary = action.payload;
      state.loading = false;
    },
    fetchDashboardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
