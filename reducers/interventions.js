// pas encore fini( à voir )
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const interventions = createSlice({
    name: 'interventions',
    initialState,
    reducers: {
    addinterventionToStore: (state, action) => {
        state.value.push(action.payload);
   },
 },
});

export const { addinterventionToStore } = interventions.actions;
export default interventions.reducer;