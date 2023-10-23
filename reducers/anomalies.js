// pas encore fini( à voir )
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const anomalies = createSlice({
    name: 'anomalies',
    initialState,
    reducers: {
    addanomalieToStore: (state, action) => {
        state.value.push(action.payload);
   },
 },
});

export const { addanomalieToStore } = anomalies.actions;
export default anomalies.reducer;