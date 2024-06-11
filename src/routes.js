
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";


// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CreditCard from "examples/Icons/CreditCard";
import Schema from "layouts/schema";
import Cube from "examples/Icons/Cube";
import Modify from"examples/Icons/modify";
import Pencil from "examples/Icons/Pencil";
import Signin from "examples/Icons/Signin";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    protected: true,
  },

  {
    type: "collapse",
    name: "Billing Overview",
    key: "Billing Overview",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Tagged Billing Data",
    key: "Tagged Billing Data",
    route: "/billing",
    icon: <Cube size="12px" />,
    component: <Billing />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Tag Value Adjustments",
    key: "Tag Value Adjustments",
    route: "/TagValueAdjustments",
    icon: <Pencil size="12px" />,
    component: <Schema />,
    noCollapse: true,
    protected: true,
  },


  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "History",
    key: "History",
    route: "/History",
    icon: <Document size="12px" />,
    component: <Profile />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Signin size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },

];

export default routes;
