import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice"

const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests: requestReducer
    },
});


export default appStore;