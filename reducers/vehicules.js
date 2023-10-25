import { createSlice } from '@reduxjs/toolkit';


const initialState = {
 value: [],
};

export const vehicules = createSlice({
    name: 'vehicules',
    initialState,
    reducers: {
    defineListVehicules : (state,action) => {
      state.value = action.payload
    }
 },
});

export const { defineListVehicules } = vehicules.actions;
export default vehicules.reducer;