import React, { createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '@services/pocketbase';
import { Collections, CompanyResponse, UsersResponse } from '@utils/types';
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
      api.collection(Collections.Users).getOne(response.record.id, {
        expand: 'company',
      }).then((response) => {
        setUser(response as any);
        AsyncStorage.setItem('@PocketBase:user', JSON.stringify(response));
      }).catch((error) => {
        console.log(error);
        Toast({ titulo: 'Ops!', descricao: 'Nenhum usuário encontrado.', type: 'warning' }); 
      });
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhum usuário encontrado.', type: 'warning' });
    });
  }

  async function handleLogout(){
    AsyncStorage.removeItem('@PocketBase:user');
    setUser(null as any);
    api.authStore.clear();
  }


  
  useEffect(() => {
    async function loadUser(){
      const user = await AsyncStorage.getItem('@PocketBase:user');
      if(user){
        setUser(JSON.parse(user));
      }
    }

    loadUser();
  }, [])

  const value = { user, setUser, handleLogin, handleLogout };

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
