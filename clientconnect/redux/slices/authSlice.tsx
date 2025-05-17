import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUserAPI } from '../../api/loginApi';

// Define types
interface User {
  _id: string;
  email: string;
  name?: string;
  // Add more fields if needed
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await loginUserAPI(email, password);
    return response; // should return { user, token }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Login failed. Please try again.'
    );
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
