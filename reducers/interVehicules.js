import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : {plaque:null,interventions:[]}
}

export const interVehicules = createSlice({
    name : 'interVehicules',
    initialState,
    reducers : {
        addInterPlaque : (state,action) => {
            state.value = {plaque:action.payload.plaque,interventions:action.payload.interventions}
        },
        removeInterPlaque : (state,action) => {
            state.value = {plaque:null,interventions:[]}
        }
    }
})

export const { addInterPlaque , removeInterPlaque } = interVehicules.actions
export default interVehicules.reducer