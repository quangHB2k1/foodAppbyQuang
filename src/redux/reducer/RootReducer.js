import { combineReducers } from "redux";
import userReducer from "./userReducer";
import supplierReducer from "./supplierReducer";

const rootReducer = combineReducers({ user: userReducer, supply: supplierReducer })
export default rootReducer