import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../shared/contexts/UserContext/UserContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

  if (sessionStorage.getItem("isLoggedIn") === "true" ? false : true) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};