import { configureStore } from "@reduxjs/toolkit";
import flight from "./Slices/flightSlice"

export default configureStore({
    reducer:{flight}
})