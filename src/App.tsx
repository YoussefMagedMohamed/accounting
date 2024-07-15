import "./App.css";
// import Invoices from "./Screens/Invoices/Invoices";
import ManualJournals from "./Screens/ManualJournals/ManualJournals";
// import NewAccount from "./Screens/NewAccount/NewAccount";

function App() {
  return (
    <>
      <div className="container mx-auto">
        {/* <NewAccount /> */}
        <ManualJournals />
        {/* <Invoices /> */}
      </div>
    </>
  );
}

export default App;
