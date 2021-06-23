import React, { useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase";
import { fakeCategories, initCategories } from "./Models/Categories";
import { fakeCurrencies, initCurrencies } from "./Models/Currencies";
import { fakeIcons } from "./Models/Icons";
import { clearData, loadData, setCurrentWallet } from "./Models/LoadData";
import { initTimeRange } from "./Models/LocalModels/TimeRange";
import { fakeWallets, wallets } from "./Models/Wallets";

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
      setAuthInit({ loading: false, auth, loadedData: false });
    });
  }, []);

  useEffect(() => {
    if (authInit.auth && authInit.auth.userId) {
      // loadData(authInit.auth.userId).then(() => {
      initTimeRange();
      fakeCurrencies();
      fakeCategories();
      fakeIcons();
      fakeWallets();
      setCurrentWallet(wallets[0]);
      const auth = authInit.auth;
      setAuthInit({ loading: false, auth, loadedData: true });
      // });
    }

    if (!authInit.auth?.loggedIn) {
      clearData();
    }
  }, [authInit.auth]);

  return authInit;
}
