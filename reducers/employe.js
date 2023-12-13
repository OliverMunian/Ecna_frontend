
import { createSlice } from '@reduxjs/toolkit';
// stockage du user avec le token, username et le SIREN 
const initialState = {
 value: {token: null, username:null},
};

export const employe = createSlice({
    name: 'employe',
    initialState,
    reducers: {
    //ajoute le token dans le reducer 
    addtokenEmployeToStore: (state, action) => {
        state.value.token = action.payload;
   },
   //ajoute le username dans le reducer 
   addEmployeToStore: (state, action) => {
    state.value.username = action.payload;
  },
 },
});

export const { addtokenEmployeToStore, addEmployeToStore } = employe.actions;
export default employe.reducer;