import { useState } from "react";

import "./App.css";
import EMIComp from "./components/EMIComp";

//6 states for cost, interest, fee, downpayment, tenure, emi
//make component for input

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className=" flex justify-center items-center text-neutral-900 min-h-screen">
      <EMIComp />
    </main>
  );
}

export default App;
