import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import userStore from "../../store/UserStore";

export const RequireAdmin = observer(({ children }: { children: JSX.Element }) => {

  if (!userStore.user?.isAdmin) return <Navigate to="/" replace={true} />;

  return children;
})