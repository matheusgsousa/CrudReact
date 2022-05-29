import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SenhasList } from "../components/senhas-list.component"
import { AddSenha } from "../components/add-senha.component"

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoutes />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Senhas" element={<SenhasList />} />
            <Route path="/Add" element={<AddSenha />} />
          </Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};
