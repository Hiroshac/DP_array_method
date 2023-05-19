import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { AddTicket } from "./component/AddTicket";
import { DisplayActive } from "./component/DisplayActive";
import { Nav } from "./component/Nav";
import { Ticket } from "./component/Ticket";

function App() {
  return (
    <div>
      <Nav/>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path = "" */}
          <Route exact path={"/"} element={<AddTicket />} />
          <Route exact path={"/ticket/:id"} element={<Ticket />} />
          <Route exact path={"/disactive/:id"} element={<DisplayActive />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
