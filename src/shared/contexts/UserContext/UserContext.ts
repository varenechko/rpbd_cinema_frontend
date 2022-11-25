import { createContext } from "react";
import { IUser } from "../../interfaces/user.interfase";

interface AuthContextProps {
  user: IUser | undefined;
  setUser: any;
  // setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> | (() => void);
}

const UserContext = createContext<AuthContextProps>({
  user: undefined,
  setUser: () => {},
});

export { UserContext };