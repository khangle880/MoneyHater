import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AppTabs from "./AppTabs";
import LoginPage from "./pages/LoginPage";
import { AuthContext, LoadDataContext } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthInit } from "./auth";
import RegisterPage from "./pages/RegisterPage";

import LoadingContainer from "./components/Loading/LoadingContainer";


const App: React.FC = () => {
  const { loading, auth, loadedData } = useAuthInit();

  if (loading) return <LoadingContainer isOpen={true} />;
  console.log(auth);

  return (
    <IonApp>
      <AuthContext.Provider value={auth!}>
        <IonReactRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/my">
              <LoadDataContext.Provider value={loadedData!}>
                <AppTabs />
              </LoadDataContext.Provider>
            </Route>
            <Redirect exact path="/" to="/my/Transactions" />
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
