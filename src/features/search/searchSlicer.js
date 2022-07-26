import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    hotelsData: [],
    searchedName:'',
    priceRange: "--Under--",
    ratingsRange: "--Star--",
    startDate: new Date().toJSON().slice(0,10),
    endDate:   new Date().toJSON().slice(0,10),
    hasHotelData: false,
    isSearch: false
}

const searchSlider = createSlice({
    name:'search',
    initialState,
    reducers:{
        getSearchName:(state,{payload})=>{
            state.searchedName = payload.searchedName
        },
        getPriceRange:(state, {payload})=>{
            state.priceRange = payload.priceRange;
        },
        getRatingsRange:(state, {payload})=>{
            state.ratingsRange = payload.ratingsRange;

        },
        getStartDate:(state, {payload})=>{
            state.startDate = payload.startDate;
            state.endDate = state.startDate > state.endDate ? state.startDate : state.endDate
        },
        getEndDate:(state, {payload})=>{
            state.endDate = payload.endDate 
        },
        getHotelsData:(state,{payload})=>{
            state.hotelsData = payload.data
        },
        setHasData:(state, {payload})=>{
            state.hasHotelData = payload.hasData
        },
        setIsSearch:(state,{payload})=>{
            state.isSearch = payload.isInputClicked
        }
    }
})


export const {getEndDate,getPriceRange,getRatingsRange,getSearchName,getStartDate,getHotelsData,setHasData,setIsSearch} = searchSlider.actions;
export default searchSlider.reducer;