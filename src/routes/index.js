import React from 'react';

import AuthRoutes from './auth';
import AppRoutes from './app';

import Loading from '../components/Loading';
import { useAuth } from '../hooks/auth';

export default function Routes() {
  const { signed, appLoading } = useAuth();

  if (appLoading) {
    return <Loading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}
