import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { IUser } from './shared/interfaces/user.interface';
import { UserContext } from './shared/contexts/UserContext/UserContext';
import { LoginPage } from './pages/Login/Login';
import { SignUpPage } from './pages/SignUp/SignUp';
import { Header } from './components/Header/Header';
import { RequireAuth } from './components/ProtectedRoutes/RequireAuth';
import { RequireAdmin } from './components/ProtectedRoutes/RequireAdmin';
import { AdminPage } from './pages/Admin/AdminPage/AdminPage';
import { MainPage } from './pages/MainPage/MainPage';
import { theme } from './shared/theme';
import { ThemeProvider } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import userStore from './store/UserStore';
import { FilmSessionsPage } from './pages/FilmSessionsPage/FilmSessions';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SessionPage } from './pages/SessionPage/SessionPage';
import { AddSessionPage } from './pages/Admin/AddSessionPage/AddSessionPage';
import { TopFilms } from './pages/MainPage/components/TopFilms/TopFilms';

const App = observer(() => {
  // const [user, setUser] = useState<IUser | undefined>(undefined);

  // useEffect(() => {
  //   console.log('user', user);
    
  // }, [user])

  // useEffect(() => {
  //   (async () => {
  //     const response = await postRequest("users/login", {
  //       login,
  //       password,
  //     });
  //     if (response) {
  //       userStore.user = response.data;
  //       sessionStorage.setItem('isLoggedIn', 'true');
  //       response.data.isAdmin ? navigate('/admin', { replace: true }): navigate("/", { replace: true });
  //     }
  //   })()
  // }, [])

  return (
    <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signUp" element={<SignUpPage />} />
             <Route
              path="/"
              element={
                  <MainPage/>
              }
            />
             <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminPage/>
                </RequireAdmin>
              }
            />
            <Route
              path="film/:id"
              element={
                  <FilmSessionsPage />
              }
            />
            <Route
              path="session/:id"
              element={
                <RequireAuth>
                  <SessionPage />
                </RequireAuth>
              }
            />
            <Route
              path="profile/:id"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="add-session"
              element={
                // <RequireAdmin>
                  <AddSessionPage />
                // </RequireAdmin>
              }
            />
            <Route
              path="top-films"
              element={
                <RequireAdmin>
                  <TopFilms />
                </RequireAdmin>
              }
            />
            {/*<Route
              path="createPublication"
              element={
                <RequireAuth>
                  <CreatePublication />
                </RequireAuth>
              }
            />
            <Route
              path="editPublication/:id"
              element={
                <RequireAuth>
                  <EditPublication />
                </RequireAuth>
              }
            /> */}
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Something went wrong you should not be here</p>
                </main>
              }
            />
          </Routes>
    </ThemeProvider>
  );

})

export default App;

// const onClick = async () => {
//   // const response = await sendGetRequest('/users');
//   const response = await sendPostRequest('/users/create', {login: 'kinoman', password: '111'});
//   if (response) {
//     setResponse(response);
//   }