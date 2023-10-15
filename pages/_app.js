import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";
// import persistStore from "redux-persist/es/persistStore";

// let persistor = persistStore(store);
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
