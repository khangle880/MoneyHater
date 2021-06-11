import {
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonThumbnail,
} from "@ionic/react";
import walletIcon from "../../icons/icons8-coin-wallet.svg";

import React, { useState } from "react";
import { Wallet, wallets } from "../../Models/Wallets";

interface props {
  wallet: Wallet;
  setWallet: (data: Wallet) => void;
}

const SelectWalletPopover: React.FC<props> = ({ wallet, setWallet }) => {
  const [popoverWallet, setShowPopoverWallet] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <React.Fragment>
      <IonItem
        lines="inset"
        button
        onClick={(e: any) => {
          e.persist();
          setShowPopoverWallet({ showPopover: true, event: e });
        }}
      >
        <IonIcon slot="start" icon={walletIcon} />
        <IonInput placeholder="Wallet" value={wallet?.name} readonly={true} />
      </IonItem>
      <IonPopover
        event={popoverWallet.event}
        isOpen={popoverWallet.showPopover}
        onDidDismiss={() =>
          setShowPopoverWallet({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          {wallets.map((child) => (
            <IonItem
              button
              key={child.id}
              onClick={() => {
                setWallet(child);
                setShowPopoverWallet({
                  showPopover: false,
                  event: undefined,
                });
              }}
            >
              <IonThumbnail slot="start">
                <IonImg src={walletIcon} />
              </IonThumbnail>
              <IonLabel>
                <h2>{child.name}</h2>
                <h3>{`${child.balance} ${child.currency_object.symbol}`}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </React.Fragment>
  );
};

export default SelectWalletPopover;
