import React, { createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '@services/pocketbase';
import { Collections, UsersResponse } from '@utils/types';
import Toast from '@components/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthProviderProps = {
  user: UsersResponse;
  setUser: (user: UsersResponse) => void;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
};


export const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsersResponse>(null as any);

  async function handleLogin( email: string, password: string ) {
    await api.collection(Collections.Users).authWithPassword(
      email, password,
      ).then((response) => {
      setUser(response.record as any);
      AsyncStorage.setItem('@Reservers:user', JSON.stringify(response.record));
    }).catch((error) => {
      console.log(error);
      Toast({titulo: 'Erro ao fazer o login',descricao: 'Por favor, verifique seu e-mail e password.', type: 'danger'})
    })
  }

  async function handleLogout(){
    AsyncStorage.removeItem('@Reservers:user');
    setUser(null as any);
    api.authStore.clear();
  }

  
  useEffect(() => {
    async function loadUser(){
      const user = await AsyncStorage.getItem('@Reservers:user');
      if(user){
        setUser(JSON.parse(user));
      }
    }

    loadUser();
  }, [])

  const value = { handleLogin, handleLogout, user, setUser };

  return (
    <AuthContext.Provider value={value as any}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
