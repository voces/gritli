import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { randomUUID } from "../helpers/uuid.ts";

export const outputSlice = createSlice({
  name: "output",
  initialState: [] as { key: string; node: React.ReactNode; time: number }[],
  reducers: {
    append: (state, log: PayloadAction<React.ReactNode>) => {
      state.splice(0, 0, {
        time: Date.now(),
        key: randomUUID(),
        node: log.payload,
      }).slice(0, 250);
    },
  },
});
