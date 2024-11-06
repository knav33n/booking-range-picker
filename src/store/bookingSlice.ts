import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

export type RangeOption =
  | "current month"
  | "next 30 days"
  | "next 60 days"
  | "next 90 days"
  | "custom"
  | "week"
  | "month";

export interface StartNEndDateInfo {
  asOfDate: string;
  startDate: string;
  endDate: string;
}

export interface RangeInfo {
  startDate: string;
  endDate: string;
  range: RangeOption;
  customNumberOfDays?: number;
}

interface BookingState {
  asOfDate: string;
  range: RangeOption;
  customRange: number | null;
  startDate: string;
  endDate: string;
}

const today = new Date();
const initialState: BookingState = {
  asOfDate: new Date().toISOString(),
  range: "current month",
  customRange: null,
  startDate: moment(today).startOf("month").toDate().toISOString(),
  endDate: moment(today).endOf("month").toDate().toISOString(),
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setNewAsOfDate: (state, action: PayloadAction<StartNEndDateInfo>) => {
      state.asOfDate = action.payload.asOfDate;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setNewRange: (state, action) => {
      state.range = action.payload;
    },
    updateNewRange: (state, action: PayloadAction<RangeInfo>) => {
      state.customRange =
        action.payload.range === "custom"
          ? action.payload.customNumberOfDays!
          : null;
      state.range = action.payload.range;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const { setNewAsOfDate, setNewRange, updateNewRange } =
  bookingSlice.actions;
export default bookingSlice.reducer;
