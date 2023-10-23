
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {plaque:null,type:null, etat:null, interventions:[]},
};

export const vehicules = createSlice({
    name: 'vehicules',
    initialState,
    reducers: {
    addplaqueToSotre: (state, action) => {
      state.value.token = action.payload;
   },
    addtypeToStore: (state, action) => {
      state.value.type = action.payload;
    },
    addetatToStore: (state, action) => {
      state.value.etat = action.payload;
    },
    addinterventionsToStore: (state, action) => {
      state.value.push(action.payload);
    },
 },
});

export const { addetatToStore, addplaqueToSotre, addtypeToStore, addinterventionsToStore } = vehicules.actions;
export default vehicules.reducer;