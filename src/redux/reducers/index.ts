import { combineReducers } from "redux";
import RouteReducer from "./RouteReducer";

const RootReducer = combineReducers({
    route: RouteReducer,
});

export default RootReducer;