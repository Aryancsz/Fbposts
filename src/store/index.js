import { createStore, combineReducers } from "redux";
import gifReducer from "./reducers/gifReducer";
import allPostsReducer from "./reducers/allPostsReducer";

const root = combineReducers({
  gifReducer,
  allPostsReducer,
});
const store = createStore(
  root,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
