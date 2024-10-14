import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

const container = document.getElementById('root');
const root = createRoot(container); // No need to pass the container again in render

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster/>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
