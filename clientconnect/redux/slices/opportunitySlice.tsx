import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OpportunityStatus = 'New' | 'Closed Won' | 'Closed Lost';

export interface Opportunity {
  id: string;
  customerId: string;
  name: string;
  status: OpportunityStatus;
}

interface OpportunityState {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
}

const initialState: OpportunityState = {
  opportunities: [],
  loading: false,
  error: null,
};

const opportunitySlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    fetchOpportunitiesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOpportunitiesSuccess(state, action: PayloadAction<Opportunity[]>) {
      state.loading = false;
      state.opportunities = action.payload;
    },
    fetchOpportunitiesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addOpportunity(state, action: PayloadAction<Opportunity>) {
      state.opportunities.push(action.payload);
    },
    editOpportunity(state, action: PayloadAction<Opportunity>) {
      const index = state.opportunities.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.opportunities[index] = action.payload;
      }
    },
    deleteOpportunity(state, action: PayloadAction<string>) {
      state.opportunities = state.opportunities.filter((o) => o.id !== action.payload);
    },
  },
});

export const {
  fetchOpportunitiesStart,
  fetchOpportunitiesSuccess,
  fetchOpportunitiesFailure,
  addOpportunity,
  editOpportunity,
  deleteOpportunity,
} = opportunitySlice.actions;
export default opportunitySlice.reducer;
