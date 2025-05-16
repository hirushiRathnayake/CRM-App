import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name?: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async (userData, thunkAPI) => {
  try {
    // Replace this with real API call
    // const response = await api.register(userData);
    const response = {
      id: 'user-' + Date.now(),
      name: userData.name,
      email: userData.email,
    };
    // Simulate network latency
    await new Promise((res) => setTimeout(res, 1000));
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Registration failed');
  }
});

// Async thunk for login
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    // Replace this with real API call
    // const response = await api.login(credentials);
    const response = {
      id: 'user-123',
      email: credentials.email,
      name: 'Demo User',
    };
    // Simulate network latency
    await new Promise((res) => setTimeout(res, 1000));
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Registration failed';
    });

    // Login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Login failed';
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
