import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { rootReducer } from "./Reducers";
import { createStore } from "redux";
import "./Style/index.scss";
import App from "./Containers/App/App";
import * as serviceWorker from "./serviceWorker";

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();