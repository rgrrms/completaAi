import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Timeline from "./pages/Timeline/Timeline";
import { GuardedRoute, GuardProvider } from "react-router-guards"
import {getFromStorage, getIsLoggedIn} from "./constants/helpers";
import Error404 from "./pages/Error404/Error404";
import Admin from "./pages/Admin/Admin";
import {STORAGE_KEYS} from "./constants/constantes";

const requireLogin = (to: any, from: any, next: any) => {
  console.log(to)
  const permission = getFromStorage(STORAGE_KEYS.HAS_PERMISSION);
  if (to.meta.auth) {
    if (getIsLoggedIn() && to.match.path !== '/auth') {
      Number(permission) === 2 ? next.redirect('/admin') : Number(permission) === 1 ? next.redirect('/') : next();
    } else {
      next.redirect('/auth');
    }
  } else if (getIsLoggedIn() && to.match.path === '/auth') {
    Number(permission) === 1 ? next.redirect('/') : next.redirect('/admin');
  } else if (getIsLoggedIn() && to.match.path === '/') {
    Number(permission) === 2 ? next.redirect('/admin') : next();
  } else {
    next();
  }
};

function Routes(){
  return (
    <BrowserRouter>
      <GuardProvider guards={[requireLogin]} error={Error404}>
        <Switch>
          <GuardedRoute component={Home} path="/auth" exact />
          <GuardedRoute component={Timeline} path="/" exact meta={{ auth: true }} />
          <GuardedRoute component={Admin} path="/admin" exact meta={{ auth: true }} />
          <GuardedRoute component={Error404} path="*" />
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  );
}

export default Routes;
