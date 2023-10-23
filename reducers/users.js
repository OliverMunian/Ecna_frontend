
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token: null, username:null, SIREN:null},
};

export const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
    addtokenToSotre: (state, action) => {
        state.value.token = action.payload;
   },
   adduserToSotre: (state, action) => {
    state.value.username = action.payload;
  },
  addSirenToSotre: (state, action) => {
    state.value.SIREN = action.payload;
  },
 },
});

export const { addtokenToSotre, adduserToSotre, addSirenToSotre } = users.actions;
export default users.reducer;