import React from "react";
import "./App.css";
import FetcherOne from "./FetcherOne";
import FetcherTwo from "./FetcherTwo";
import Simple from "./Simple";

function App() {
  return (
    <div className="App">
      <section>
        <h2>Simple Toggle</h2>
        <Simple />
        <h2>Fetcher</h2>
        <FetcherOne />
        <FetcherTwo />
      </section>
    </div>
  );
}

export default App;
