import {configureStore} from '@reduxjs/toolkit';
import modalReduser from './features/modal/modalSlice'

const store = configureStore({
    reducer:{
        modal: modalReduser,
    }
})

export default store;