import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import userStore from "../../store/UserStore";

export const RequireAuth = observer(({ children }: { children: JSX.Element }) => {

  if (sessionStorage.getItem("isLoggedIn") === "true" ? false : true && !userStore?.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace={true} />;
  }

  return children;
});