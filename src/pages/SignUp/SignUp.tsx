import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { BoxStyled, SignUpTypography, SignUpWrapper } from "./styles";
import { Button, Typography } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { sendPostRequest } from "../../axios/hooks";
import { UserContext } from "../../shared/contexts/UserContext/UserContext";
import { useAxiosPost } from "../../axios/useAxiosPost";
import { observer } from "mobx-react-lite";
import userStore from "../../store/UserStore";

export const SignUpPage: FC = observer(() => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { postRequest, error, isLoading } = useAxiosPost();

  let navigate = useNavigate();

  const textFieldWidth = "30vw";

  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

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

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  const handleOnSignUpClick = async () => {
    const response = await postRequest("users/create", {
      login,
      password,
    });
    if (response) {
      userStore.setUserUnfo(response.data);
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate("/", { replace: true });
    }
  };

  return (
    <BoxStyled>
      <TextField
        label="логин"
        id="outlined-start-adornment"
        value={login}
        onChange={handleLoginChange}
        sx={{ m: 1, width: textFieldWidth }}
      />
      <FormControl sx={{ m: 1, width: textFieldWidth }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">пароль</InputLabel>
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
      <Button variant="contained" onClick={handleOnSignUpClick}>
        Зарегистрироваться
      </Button>
    </BoxStyled>
  );
})