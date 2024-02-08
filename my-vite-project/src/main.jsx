import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./utils/store";
import { persistStore } from "redux-persist";
import App from "./App";

let persistor = persistStore(store);

// Use createRoot API for React 18+
const container = document.getElementById("root");
const root = createRoot(container); // Create a root.

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
