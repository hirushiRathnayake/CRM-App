import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCustomersAPI,
  fetchCustomerByIdAPI,
  updateCustomerStatusAPI,
  addOpportunityAPI,
  Customer,
  Opportunity,
} from '../../api/customerApi';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

// ✅ Fetch all customers
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, thunkAPI) => {
    try {
      const response = await fetchCustomersAPI();
      return response;
       console.log(response);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch customers');
    }
  }
);

// ✅ Fetch customer by ID
export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetchCustomerByIdAPI(id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch customer');
    }
  }
);

// ✅ Update customer status
export const updateCustomerStatus = createAsyncThunk(
  'customers/updateCustomerStatus',
  async ({ id, status }: { id: string; status: string }, thunkAPI) => {
    try {
      const response = await updateCustomerStatusAPI(id, status);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update status');
    }
  }
);

// ✅ Add opportunity
export const addOpportunity = createAsyncThunk(
  'customers/addOpportunity',
  async (
    {
      customerId,
      name,
      status,
    }: { customerId: string; name: string; status: string },
    thunkAPI
  ) => {
    try {
      const response = await addOpportunityAPI(customerId, { name, status });
      return { customerId, opportunity: response };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add opportunity');
    }
  }
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<Customer[]>) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✅ Fetch by ID
      .addCase(fetchCustomerById.fulfilled, (state, action: PayloadAction<Customer>) => {
        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index > -1) {
          state.customers[index] = action.payload;
        } else {
          state.customers.push(action.payload);
        }
      })

      // ✅ Update status
      .addCase(updateCustomerStatus.fulfilled, (state, action: PayloadAction<Customer>) => {
        const index = state.customers.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.customers[index].status = action.payload.status;
        }
      })

      // ✅ Add opportunity
      .addCase(addOpportunity.fulfilled, (state, action: PayloadAction<{ customerId: string; opportunity: Opportunity }>) => {
        const customer = state.customers.find(c => c.id === action.payload.customerId);
        if (customer) {
          customer.opportunities = [...(customer.opportunities || []), action.payload.opportunity];
        }
      });
  },
});

export default customerSlice.reducer;
