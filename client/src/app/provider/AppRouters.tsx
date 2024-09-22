import React, { lazy } from 'react';
import { Route, Routes} from 'react-router-dom';
import HomePage from '../../pages/home/HomePage';
import RegistrationPage from '../../pages/auth/RegistrationPage';
import AuthorizationPage from '../../pages/auth/AuthorizationPage';
import LogoutPage from '../../pages/auth/LogoutPage';
import ErrorPage from '../../pages/error/ErrorPage';


function AppRouters(): JSX.Element {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/authorization" element={<AuthorizationPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouters;