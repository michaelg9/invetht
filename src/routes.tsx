import Portfolio from "views/Dashboard/Portfolio";
import Explore from "views/Dashboard/Explore";
import Assessment from "views/Dashboard/Assessment/index.jsx";
import SignIn from "views/Auth/SignIn";
import SignUp from "views/Auth/SignUp";

import {
  HomeIcon,
  CreditIcon,
  DocumentIcon,
  RocketIcon,
  HelpIcon
} from "components/Icons/Icons";
import ConnectWallet from "ether/ConnectWallet";

const dashRoutes = [
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: <HomeIcon color="inherit" />,
    component: Portfolio,
    layout: "/admin",
  },
  {
    path: "/assessment",
    name: "Assessment",
    icon: <HelpIcon color="inherit" />,
    component: Assessment,
    layout: "/admin",
  },
  {
    path: "/explore",
    name: "Explore",
    icon: <RocketIcon color="inherit" />,
    component: Explore,
    layout: "/admin",
  },
  {
    path: "/connect",
    name: "Connect Wallet",
    icon: <CreditIcon color="inherit" />,
    component: ConnectWallet,
    layout: "/admin",
  },
  {
    path: "/signin",
    name: "Sign In",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    listed: false,
    layout: "/auth",
  },
  {
    path: "/signup",
    name: "Sign Up",
    icon: <RocketIcon color="inherit" />,
    secondaryNavbar: true,
    component: SignUp,
    listed: false,
    layout: "/auth",
  },
];
export default dashRoutes;
