import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const checkPermission = (props) => {
  //return true;
  const token = localStorage.getItem('_token')

  if (token !== undefined && token !== '' && token !== null){
    return true
  } else {
    return false
  }
};


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkPermission(props)
        ? <Component {...props} />
        : <Redirect to={{   pathname: '/',
          state: { from: props.location }
        }} />
    }
  />
);

export default PrivateRoute
