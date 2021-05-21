import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase";
import { initCategories } from "./Models/Categories";
import { initCurrencies } from "./Models/Currencies";

interface Auth {
  loggedIn: boolean;
  userId?: string;
}
interface AuthInit {
  loading: boolean;
  auth?: Auth;
  loadedData?: boolean;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });
export const LoadDataContext = React.createContext<boolean>(false);

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useLoadedData(): boolean {
  return useContext(LoadDataContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({
    loading: true,
  });

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser
        ? { loggedIn: true, userId: firebaseUser.uid }
        : { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);

  useEffect(() => {
    if (authInit.auth && authInit.auth.userId) {
      Promise.all([
        initCurrencies(),
        initCategories(),
      ]).then(() => {
        const auth = authInit.auth;
        setAuthInit({ loading: false, auth, loadedData: true });
      });
    }
  }, [authInit.auth]);

  return authInit;
}
