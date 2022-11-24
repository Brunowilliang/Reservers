import React, { createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '@services/pocketbase';
import { Collections, CompanyResponse, UsersResponse } from '@utils/types';
import Toast from '@components/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthProviderProps = {
  user: UsersResponse;
  setUser: (user: UsersResponse) => void;
  company: CompanyResponse;
  setCompany: (company: CompanyResponse) => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  loginCompany: (email: string, password: string) => void;
  logoutCompany: () => void;
};


export const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsersResponse[]>(null as any);
  const [company, setCompany] = useState<CompanyResponse[]>(null as any);

  async function loginUser( email: string, password: string ) {
    await api.collection(Collections.Users).authWithPassword(
      email, password,
      ).then((response) => {
        setUser(response.record as any);
        AsyncStorage.setItem('@PocketBase:user', JSON.stringify(response.record));
        console.log(JSON.stringify(response));
      }).catch((error) => {
        console.log(error);
        Toast({ titulo: 'Ops!', descricao: 'Nenhum usuário encontrado.', type: 'warning' });
      });
    }

  async function logoutUser(){
    setUser(null as any);
    AsyncStorage.removeItem('@PocketBase:user');
    api.authStore.clear();
  }

  async function loginCompany( email: string, password: string ) {
    await api.collection(Collections.Company).authWithPassword(
    email, password,
    ).then((response) => {
      setCompany(response.record as any);
      AsyncStorage.setItem('@PocketBase:company', JSON.stringify(response.record));
      console.log(JSON.stringify(response));
    }).catch((error) => {
      console.log(error);
      Toast({ titulo: 'Ops!', descricao: 'Nenhuma empresa encontrada.', type: 'warning' });
    });
  }

  async function logoutCompany(){
    setCompany(null as any);
    AsyncStorage.removeItem('@PocketBase:company');
    api.authStore.clear();
  }

  async function loadUserStorageData() {
    const userStorage = await AsyncStorage.getItem('@PocketBase:user');
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }

  async function loadCompanyStorageData() {
    const companyStorage = await AsyncStorage.getItem('@PocketBase:company');
    if (companyStorage) {
      setCompany(JSON.parse(companyStorage));
    }
  }

  useEffect(() => {
    loadUserStorageData();
    loadCompanyStorageData();
  }, []);


  const value = { user, setUser, company, setCompany, loginUser, logoutUser, loginCompany, logoutCompany };

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
