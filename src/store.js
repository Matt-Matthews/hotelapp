import {configureStore} from '@reduxjs/toolkit';
import modalReduser from './features/modal/modalSlice';
import hotelReduser from './features/hotel/hotelSlicer';
import bookingReduser from './features/booking/bookingSlicer';
import searchReducer from './features/search/searchSlicer'

const store = configureStore({
    reducer:{
        modal: modalReduser,
        hotel: hotelReduser,
        booking: bookingReduser,
        search: searchReducer
    }
})

export default store;