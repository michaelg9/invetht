import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Assessment from "views/Dashboard/Assessment";
import Billing from "views/Dashboard/Billing";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn";
import SignUp from "views/Auth/SignUp";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";
import ConnectWallet from "ether/ConnectWallet";

const dashRoutes = [
  {
    path: "/portofolio",
    name: "Portofolio",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
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
    path: "/explore",
    name: "Explore",
    icon: <RocketIcon color="inherit" />,
    component: Assessment,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <PersonIcon color="inherit" />,
    secondaryNavbar: true,
    component: Profile,
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
