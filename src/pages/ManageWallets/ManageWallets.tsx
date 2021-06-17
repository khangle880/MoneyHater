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
import { useHistory } from "react-router";
import { setCurrentWallet } from "../../Models/LoadData";
import WalletItem from "./WalletItem";

const ManageWallets: React.FC<{ initNeedRender: boolean }> = ({
  initNeedRender,
}) => {
  const history = useHistory();
  const [needRender, setNeedRender] = useState(initNeedRender);
  const forceRender = () => setNeedRender(!needRender);

  useEffect(() => {
    setTimeout(() => {
      setNeedRender(!needRender);
    }, 2000);
  }, [needRender]);
  useEffect(() => () => {});

  const handleSelectWallet = (data: Wallet) => {
    setCurrentWallet(data);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              className="icon-padding"
              defaultHref="/my"
            ></IonBackButton>
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
              handleDeleteWallet={() => forceRender()}
              handleSelect={() => handleSelectWallet(child)}
              key={child.id}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ManageWallets;
