import { createStore } from "redux";
import rootReducer from "../reducers/index";

/**
* the state in redux comes from reducers which produce the state of your application.
*/
const store = createStore(rootReducer);
export default store;
