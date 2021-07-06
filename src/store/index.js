import { createStore, combineReducers } from "redux";
import gifReducer from "./reducers/gifReducer";

const root = combineReducers({
  gifReducer,
});
const store = createStore(
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
