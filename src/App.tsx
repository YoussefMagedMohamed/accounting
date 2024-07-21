import "./App.css";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import AllItems from "./Screens/AllItems/AllItems";
import ChartOfAccounts from "./Screens/ChartOfAccounts/ChartOfAccounts";
import Invoices from "./Screens/Invoices/Invoices";
import Items from "./Screens/Items/Items";
import Layout from "./Screens/Layout/Layout";
import ManualJournals from "./Screens/ManualJournals/ManualJournals";
// import Navbar from "./Screens/Navbar/Navbar";
import NewAccount from "./Screens/NewAccount/NewAccount";
import NewCustomer from "./Screens/NewCustomer/NewCustomer";
import EditAccount from "./Screens/EditAccount/EditAccount";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <AllItems /> },
      { path: "chartOfAccounts", element: <ChartOfAccounts /> },
      { path: "invoices", element: <Invoices /> },
      { path: "items", element: <Items /> },
      { path: "manualJournals", element: <ManualJournals /> },
      { path: "newAccount", element: <NewAccount /> },
      { path: "newCustomer", element: <NewCustomer /> },
      { path: "editAccount/:id", element: <EditAccount /> },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="container mx-auto">
        <RouterProvider router={routers}></RouterProvider>
      </div>
    </>
  );
}

export default App;
