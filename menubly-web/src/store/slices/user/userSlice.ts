import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { fetchReport } from './userAPI';

export interface ReportState {
  forgotEmail: string | null;
  report: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ReportState = {
  forgotEmail: null,
  report: {
    total_class: 0,
    attendance_percentage: 0,
    total_time_spent: 0
  },
  status: 'idle',
};

export const getReportAsync = createAsyncThunk(
  'classes/fetchReport',
  async () => {
    const response = await fetchReport();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setForgotEmail: (state, {payload}) => {
      state.forgotEmail = payload.email;
    }
  },
  extraReducers: (builder) => {
    
  },
});
export const { setForgotEmail } = userSlice.actions;

export const selectReport = (state: RootState) => state.user.report;
export const selectForgotEmail = (state: RootState) => state.user.forgotEmail;

export default userSlice.reducer;
