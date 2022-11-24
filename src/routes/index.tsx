
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import { UserRoutes } from './user.routes';
import { CompanyRoutes } from './company.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '@hooks/useAuth';

export function Routes () {
  const { user, company } = useAuth();

  return (
    <NavigationContainer>
      {!user && !company ? <AuthRoutes /> : user ? <UserRoutes /> : <CompanyRoutes />}
    </NavigationContainer>
  );
}
 