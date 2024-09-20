import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('../../pages/home/HomePage'));
const RegistrationPage = lazy(() => import('../../pages/auth/RegistrationPage'));
const AuthorizationPage = lazy(() => import('../../pages/auth/AuthorizationPage'));
const LogoutPage = lazy(() => import('../../pages/auth/LogoutPage'));

function AppRouters(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/authorization" element={<AuthorizationPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
}

export default AppRouters;