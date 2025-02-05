import RootReducer from "./reducers";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: RootReducer,
})

export default store;