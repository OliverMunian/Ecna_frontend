// pas encore fini( à voir )
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const patients = createSlice({
    name: 'patients',
    initialState,
    reducers: {
    addpatientToStore: (state, action) => {
        state.value.push(action.payload);
   },
 },
});

export const { addpatientToStore } = patients.actions;
export default patients.reducer;