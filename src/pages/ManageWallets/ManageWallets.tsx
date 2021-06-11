import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Wallet, wallets } from "../../Models/Wallets";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import { setCurrentWallet } from "../../Models/LoadData";
import WalletItem from "./WalletItem";
import ShareWallet from "./ShareWallet";
import TransferMoney from "./TransferMoney";

const ManageWallets: React.FC = () => {
  const history = useHistory();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => () => {});

  const handleDeleteWallet = (wallet: Wallet) => {
    setShouldRender(!shouldRender);
  };

  const handleSelectWallet = (data: Wallet) => {
    setCurrentWallet(data);
    history.goBack();
  };

  return (
    <IonPage>
      <Route exact path="/my/manage-wallets/:id/share">
        <ShareWallet />
      </Route>
      <Route exact path="/my/manage-wallets/:id/transfer-money">
        <TransferMoney />
      </Route>
      <Route exact path="/my/manage-wallets">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton className="icon-padding"></IonBackButton>
            </IonButtons>
            <IonTitle>Select Wallet</IonTitle>
            <IonButtons slot="end">
              <IonButton size="large" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {wallets.map((child) => (
              <WalletItem
                currentWallet={child}
                handleDeleteWallet={() => handleDeleteWallet(child)}
                handleSelect={() => handleSelectWallet(child)}
                key={child.id}
              />
            ))}
          </IonList>
        </IonContent>
      </Route>
    </IonPage>
  );
};

export default ManageWallets;
