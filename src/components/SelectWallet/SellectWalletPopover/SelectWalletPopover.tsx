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

import React, { useState } from "react";
import { formatMoney, Wallet, wallets } from "../../../Necessary/components";
import { walletIcon } from "../../../Necessary/icons";

import "./SelectWalletPopover.scss";

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
        onClick={(e: any) => {
          e.persist();
          setShowPopoverWallet({ showPopover: true, event: e });
        }}
      >
        <IonIcon slot="start" icon={walletIcon} />
        <IonInput placeholder="Wallet" value={wallet?.name} readonly={true} />
      </IonItem>
      <IonPopover
        cssClass="wallets-popover"
        event={popoverWallet.event}
        isOpen={popoverWallet.showPopover}
        onDidDismiss={() =>
          setShowPopoverWallet({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          {wallets.map((child) => (
            <IonItem
              disabled={child.state ? false : true}
              key={child.id}
              onClick={() => {
                setWallet(child);
                setShowPopoverWallet({
                  showPopover: false,
                  event: undefined,
                });
              }}
            >
              <IonThumbnail>
                <IonImg src={child.icon} />
              </IonThumbnail>
              <IonLabel>
                <p>{child.name}</p>
                <p>{` ${formatMoney(child.balance)} ${
                  child.currency_object.symbol
                }`}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </React.Fragment>
  );
};

export default SelectWalletPopover;
