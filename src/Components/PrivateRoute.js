import React from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ userRole, allowedRoles, children, ...rest }) => {
  // Check if the user's role is in the allowedRoles array
  const isAuthorized = allowedRoles.includes(userRole);
  const Navigate = useNavigate();

  return (
    <Route {...rest}>
      {isAuthorized ? (
        children // Render the component if authorized
      ) : (
        <Navigate to="/" /> // Redirect to login if not authorized
      )}
    </Route>
  );
};

export default PrivateRoute;
