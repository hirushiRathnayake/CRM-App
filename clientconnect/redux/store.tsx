import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import opportunityReducer from './slices/opportunitySlice';
import filterReducer from './slices/filterSlice';
import dashboardReducer from './slices/dashboardSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    opportunities: opportunityReducer,
    filters: filterReducer,
    dashboard: dashboardReducer, // add to store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
