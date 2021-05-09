import React, {useEffect, useState} from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Timeline from "./pages/Timeline/Timeline";
import { GuardedRoute, GuardProvider } from "react-router-guards"
import {getIsLoggedIn} from "./constants/helpers";
import Error404 from "./pages/Error404/Error404";

const requireLogin = (to: any, from: any, next: any) => {
  if (to.meta.auth) {
    if (getIsLoggedIn() && to.match.path !== '/auth') {
      console.log("ifzito");
      console.log(getIsLoggedIn());
      console.log(to);
      console.log(next);
      next();
    } else {
      console.log("elsezito");
      console.log(getIsLoggedIn());
      console.log(to);
      console.log(next);
      next.redirect('/auth');
    }
  } else if (getIsLoggedIn() && to.match.path === '/auth') {
    console.log("elseIFFIFIIFIFzito");
    console.log(getIsLoggedIn());
    console.log(to);
    console.log(next);
    next.redirect('/');
  } else {
    console.log("elsezizzizzito");
    console.log(getIsLoggedIn());
    console.log(to);
    console.log(next);
    next();
  }
};

function Routes(){
  // const isLogged = useState(getIsLoggedIn());
  //
  // useEffect(() => {
  //   console.log('Loguei ainda nao')
  //   if (isLogged[0] !== null) {
  //     console.log(isLogged[0])
  //     console.log('Loguei')
  //     document.location.href = '/';
  //   }
  // }, [isLogged]);

  return (
    <BrowserRouter>
      <GuardProvider guards={[requireLogin]} error={Error404}>
        <Switch>
          <GuardedRoute component={Home} path="/auth" exact />
          <GuardedRoute component={Timeline} path="/" exact meta={{ auth: true }} />
          <GuardedRoute component={Error404} path="*" />
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  );
}

export default Routes;
