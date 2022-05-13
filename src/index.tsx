/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { providers } from "ethers";
import { AsyncSendable } from "ethers/providers";
import { Web3ReactProvider } from "@web3-react/core";

import AuthLayout from "layouts/Auth";
import AdminLayout from "layouts/Admin";

const container = document.getElementById("root");
const root = createRoot(container!);

const getLibrary = (provider: AsyncSendable) => {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling

  return library;
};

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/admin/portofolio" />
      </Switch>
    </HashRouter>
  </Web3ReactProvider>
);
