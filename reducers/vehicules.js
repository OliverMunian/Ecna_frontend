
import { createSlice } from '@reduxjs/toolkit';
// stockage du/des vehicule(s) dans le reducer avec son etat, plaque, type, interventions
const initialState = {
 value: {plaque:null,type:null, etat:null, interventions:[]},
};

export const vehicules = createSlice({
    name: 'vehicules',
    initialState,
    reducers: {
     //ajoute la plaque dans le reducer 
    addplaqueToSotre: (state, action) => {
      state.value.plaque = action.payload;
   },
   //ajoute le type du véhicule dans le reducer 
    addtypeToStore: (state, action) => {
      state.value.type = action.payload;
    },
    //ajoute l'etat dans le reducer 
    addetatToStore: (state, action) => {
      state.value.etat = action.payload;
    },
    //ajoute l'interventions dans le reducer
    addinterventionsToStore: (state, action) => {
      state.value.interventions = action.payload;
    },
 },
});

export const { addetatToStore, addplaqueToSotre, addtypeToStore, addinterventionsToStore } = vehicules.actions;
export default vehicules.reducer;