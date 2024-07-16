import React from "react";
import ReactDOM from "react-dom/client";
// import global_en from "./Transelations/En/global.json";
// import global_ar from "./Transelations/Ar/global.json";
// import i18next from "i18next";
import App from "./App.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.scss";

// i18next.init({
//   interpolation: { escapeValue: false },
//   lang: "en",
//   resources: {
//     en: {
//       global: global_en,
//     },
//     ar: {
//       global: global_ar,
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <I18nextProvider i18n={i18next}> */}
      <App />
    {/* </I18nextProvider> */}
  </React.StrictMode>
);
