import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchDashboardSummaryAPI } from '../../api/dashboardApi';

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

// 🔹 Async Thunk
export const fetchDashboardSummary = createAsyncThunk(
  'dashboard/fetchSummary',
  async (_, thunkAPI) => {
    try {
      const response = await fetchDashboardSummaryAPI();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

// 🔹 Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action: PayloadAction<DashboardSummary>) => {
        state.summary = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
