import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {vehicules : [] , count : 0}
}

export const vehiculesEnCours = createSlice({
    name: 'vehiculesEnCours',
    initialState,
    reducers: {
        defineListVehiculesEnCours : (state, action) => {
            state.value.vehicules = action.payload
        },
        defineCountListVehiculesEnCours: (state, action) => {
            state.value.count = action.payload
        }
    }
})

export const { defineListVehiculesEnCours , defineCountListVehiculesEnCours } = vehiculesEnCours.actions
export default vehiculesEnCours.reducer