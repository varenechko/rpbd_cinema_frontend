import { VisibilityOff, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, Navigate, NavLink, useParams } from "react-router-dom";
import { useAxiosGet } from "../../axios/useAxiosGet";
import { useAxiosPatch } from "../../axios/useAxiosPatch";
import { useAxiosPost } from "../../axios/useAxiosPost";
import { LoginError } from "../../components/LoginError/LoginError";
import userStore from "../../store/UserStore";
import { BoxStyled } from "../Login/styles";


export const ProfilePage = observer(() => {
    const [login, setLogin] = useState(userStore.user?.login);
    const [password, setPassword] = useState(userStore.user?.password);
    const { patchRequest, error, isLoading } = useAxiosPatch();
    const { getRequest }= useAxiosGet();
    const { id } = useParams();
  
    let navigate = useNavigate();

    useEffect(() => {
        if (!userStore.user) {
            const res = getRequest(`/users/${id}`)
            userStore.setUserUnfo(res.data);
        }
    }, []);
  
    const textFieldWidth = "25vw";
  
    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
    };
  
    const handlePasswordChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setPassword(event.target.value);
    };
  
    const handleOnChangeClick = async () => {
      const response = await patchRequest(`users/${userStore.user?.id}`, {
        login,
        password,
      });
      if (response) {
        userStore.setUserUnfo(response.data);
      }
    };
  
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
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            label="Password"
          />
        </FormControl>
        <LoginError error={error}/>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          onClick={handleOnChangeClick}>
          Сохранить
        </LoadingButton>
        <Button onClick={() => navigate('/')}>
            Отменить
        </Button>
      </BoxStyled>
    );
  })