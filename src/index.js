import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import configureStore from "./redux/store/configure-store"
import Router from "./Router"

import "./assets/scss/clipshare.scss";
import "./assets/scss/bootstrap.min.scss";
import "./assets/scss/style.scss";
import "./assets/scss/theme.scss";
import "./assets/vendor/font-awesome/all.min.scss";

// import "./assets/vendor/font-awesome/font.scss";
// import "./assets/scss/utilities.scss";
// import "./assets/scss/custom.scss";
// import "./assets/vendor/themify-icons/themify-icons.scss";
// import "./assets/vendor/slick/slick.min.scss";
// import "./assets/vendor/featherlight/featherlight.min.scss";
// import "./assets/vendor/featherlight/featherlight.gallery.min.css";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={""}>
        <Router />
      </Suspense>
    </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();