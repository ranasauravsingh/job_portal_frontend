// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App.tsx";
import "./index.css";
import store from "./redux/store.ts";

const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </StrictMode>
);
