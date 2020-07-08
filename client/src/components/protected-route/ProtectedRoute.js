import React from "react";
import { Redirect, Route } from "react-router";

const ProtectedRoute = (props) => {
  const { isAuthedUser, type="private" } = props;
  // if (type === "guest" && isAuthedUser) return <Redirect to="/home" />;
  // else
  if (type === "private" && !isAuthedUser) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default ProtectedRoute;
