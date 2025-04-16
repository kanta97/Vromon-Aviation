import React, { Component } from "react";
import {
  HashRouter,
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
import PrivateRoute from "./Components/Router/PrivateRoute";
import Layout from "./Containers/Layout/Layout";
import LayoutSecondary from "./Components/LayoutSecondary";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Login = Loadable({
  loader: () => import("./views/Login"),
  loading,
});
const HotelBookingHistory = Loadable({
  loader: () => import("./views/HotelBookingHistory"),
  loading,
});

const Register = Loadable({
  loader: () => import("./views/Register"),
  loading,
});

const Page404 = Loadable({
  loader: () => import("./views/Page404"),
  loading,
});

const Page500 = Loadable({
  loader: () => import("./views/Page500"),
  loading,
});
const Activity = Loadable({
  loader: () => import("./views/Activity"),
  loading,
});

const Profile = Loadable({
  loader: () => import("./views/Profile"),
  loading,
});

const Hotel = Loadable({
  loader: () => import("./views/Hotel"),
  loading,
});

const Pnr = Loadable({
  loader: () => import("./views/Pnr"),
  loading,
});

const User = Loadable({
  loader: () => import("./views/User"),
  loading,
});

const Dashboard = Loadable({
  loader: () => import("./views/Dashboard"),
  loading,
});

const ChangePassword = Loadable({
  loader: () => import("./views/ChangePassword"),
  loading,
});

const FixedPackage = Loadable({
  loader: () => import("./views/FixedPackage"),
  loading,
});

const CustomHotel = Loadable({
  loader: () => import("./views/CustomHotel"),
  loading,
});

const BookingHistory = Loadable({
  loader: () => import("./views/BookingHistory"),
  loading,
});

const ForgotPassword = Loadable({
  loader: () => import("./views/ForgotPassword/ForgotPassword.js"),
  loading,
});
const Role = Loadable({
  loader: () => import("./views/Role/Role.js"),
  loading,
});

const Coupon = Loadable({
  loader: () => import("./views/Coupon"),
  loading,
});

const Currency = Loadable({
  loader: () => import("./views/Currency/Currency"),
  loading,
});

const PriceFactor = Loadable({
  loader: () => import("./views/PriceFactor/PriceFactor"),
  loading,
});

const FailedHotelList = Loadable({
  loader: () => import("./views/FailedHotel/FailedHotel"),
  loading,
});

const FailedDestinationList = Loadable({
  loader: () => import("./views/FailedDestination/FailedDestination"),
  loading,
});

const FailedCountryList = Loadable({
  loader: () => import("./views/FailedCountry/FailedCountry"),
  loading,
});

const VisaDocuments = Loadable({
  loader: () => import("./views/VisaDocuments"),
  loading,
});

class App extends Component {
  render() {
    return (
      <LayoutSecondary>
        <HashRouter>
          <Switch>
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <PrivateRoute
              exact
              path="/activity"
              name="Activity"
              component={Activity}
            />
            <PrivateRoute
              exact
              path="/coupon"
              name="Coupon"
              component={Coupon}
            />
            <PrivateRoute
              exact
              path="/currency"
              name="Currency"
              component={Currency}
            />
            <PrivateRoute
              exact
              path="/price-factor"
              name="Currency"
              component={PriceFactor}
            />

            <PrivateRoute exact path="/hotel" name="Hotel" component={Hotel} />
            <PrivateRoute exact path="/pnr" name="Pnr" component={Pnr} />

            <PrivateRoute
              exact
              path="/visa-documents"
              name="visa"
              component={VisaDocuments}
            />

            <PrivateRoute
              exact
              path="/failed-hotel"
              name="Failed Hotel"
              component={FailedHotelList}
            />
            <PrivateRoute
              exact
              path="/failed-destination"
              name="Failed Destination"
              component={FailedDestinationList}
            />
            <PrivateRoute
              exact
              path="/failed-country"
              name="Failed Country"
              component={FailedCountryList}
            />
            <PrivateRoute
              exact
              path="/forgotpassword"
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <PrivateRoute exact path="/user" name="User" component={User} />
            <PrivateRoute exact path="/role" name="User" component={Role} />
            <PrivateRoute
              path="/dashboard"
              name="dashboard"
              component={Dashboard}
            />
            <PrivateRoute path="/profile" name="Profile" component={Profile} />
            <PrivateRoute
              path="/change-password"
              name="change-password"
              component={ChangePassword}
            />

            {/*<Route authenticated={!!localStorage.getItem('_token')} exact path="/dashboard" name="Dashboard" component={Dashboard} />*/}
            {/* <PrivateRoute authenticated={!!localStorage.getItem('_token')} exact path="/dashboard" name="Dashboard"
                            component={Dashboard}/>*/}
            <PrivateRoute
              exact
              path="/fixed-package"
              name="Fixed Package"
              component={FixedPackage}
            />
            <PrivateRoute
              exact
              path="/custom-hotel"
              name="Hotel"
              component={CustomHotel}
            />
            <PrivateRoute
              exact
              path="/booking-history"
              name="Booking History"
              component={BookingHistory}
            />
            <PrivateRoute
              exact
              path="/hotel-booking-history"
              name="Booking History"
              component={HotelBookingHistory}
            />
            {/*<Route path="/" name="Register Page" component={Register} />*/}
            <Route path="/" name="Login Page" component={Login} />
          </Switch>
        </HashRouter>

        <ReduxToastr preventDuplicates transitionOut="fadeOut" />
      </LayoutSecondary>
    );
  }
}

export default App;
