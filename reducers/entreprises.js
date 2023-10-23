
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const entreprises = createSlice({
    name: 'entreprises',
    initialState,
    reducers: {
    addentrepriseTostore: (state, action) => {
        state.value.push(action.payload);
   },
 },
});

export const { addentrepriseTostore } = entreprises.actions;
export default entreprises.reducer;