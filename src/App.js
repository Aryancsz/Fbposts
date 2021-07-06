import Message from "./Components/Message";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Message />
      </Provider>
    </div>
  );
}

export default App;
