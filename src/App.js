import 'bootstrap/dist/css/bootstrap.min.css';
//import NavbarComp from "./componets/NavbarComp.js"
// ...
import 'devextreme/dist/css/dx.light.css';

import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Acceso from "./pages/Acceso.js";
import Layout from "./componets/Layout.js";
import ReporteGasto from './pages/Gastos/ReporteGasto.js'

function App() {

  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Acceso}></Route>
          <PrivateRoute path="/Home"
            component={Layout}>
          </PrivateRoute>
          <PrivateRoute path="/ReporteGasto"
            component={ReporteGasto}>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
