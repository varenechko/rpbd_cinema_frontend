import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { BoxStyled, SignUpTypography, SignUpWrapper } from "./styles";
import { Button, Typography } from "@mui/material";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { sendPostRequest } from "../../axios/hooks";
import { UserContext } from "../../shared/contexts/UserContext/UserContext";
import { IUser } from "../../shared/interfaces/user.interface";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAxiosPost } from "../../axios/useAxiosPost";
import { LoginError } from "../../components/LoginError/LoginError";
import { LoadingButton } from "@mui/lab";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";

export const LoginPage: FC = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { postRequest, error, isLoading } = useAxiosPost();

  let navigate = useNavigate();

  const textFieldWidth = "25vw";

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnLoginClick = async () => {
    const response = await postRequest("users/login", {
      login,
      password,
    });
    if (response) {
      userStore.setUserUnfo(response.data);
      sessionStorage.setItem('isLoggedIn', 'true');
      response.data.isAdmin ? navigate('/admin', { replace: true }): navigate("/", { replace: true });
    }
  };

  if (sessionStorage.getItem("isLoggedIn") === "true" ? true : false && userStore?.user?.id) return <Navigate to="/" replace={true} />;

  return (
    <BoxStyled>
      <TextField
        label="Логин"
        id="outlined-start-adornment"
        value={login}
        onChange={handleLoginChange}
        sx={{ m: 1, width: textFieldWidth }}
      />
      <FormControl sx={{ m: 1, width: textFieldWidth }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <LoginError error={error}/>
      <LoadingButton
        loading={isLoading}
        variant="contained"
        onClick={handleOnLoginClick}>
        Войти
      </LoadingButton>
      <SignUpWrapper>
        <SignUpTypography>
          еще нет аккаунта?
          <NavLink to="/signUp">создать</NavLink>
        </SignUpTypography>
      </SignUpWrapper>
    </BoxStyled>
  );
})