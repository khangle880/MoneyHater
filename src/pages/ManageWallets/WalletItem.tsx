import {
  IonAlert,
  IonButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonThumbnail,
} from "@ionic/react";
import React, { useState } from "react";
import { ellipsisHorizontalSharp as selectsIcon } from "ionicons/icons";
import useLongPress from "../../CustomFunction/useLongPress";
import {
  deleteWallet,
  formatMoney,
  switchWalletState,
  useAuth,
  Wallet,
} from "../../Necessary/components";
import { walletBlockedIcon, walletIcon } from "../../Necessary/icons";

interface props {
  wallet: Wallet;
  handleSelect: () => void;
  handleDeleteWallet: () => void;
}

const WalletItem: React.FC<props> = ({
  wallet,
  handleSelect,
  handleDeleteWallet,
}) => {
  const [popoverOption, setShowPopoverOption] = useState({
    showPopover: false,
    event: undefined,
  });
  const { userId } = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const onLongPress = (e: any) => {
    e.persist();
    setShowPopoverOption({ showPopover: true, event: e });
  };

  const onClick = () => {
    if (wallet.state) handleSelect();
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const switchState = () => {
    switchWalletState(userId!, wallet);
  };

  const handleDelete = () => {
    deleteWallet(userId!, wallet);
    handleDeleteWallet();
  };

  return (
    <React.Fragment>
      <IonItem>
        <IonThumbnail slot="start" {...longPressEvent}>
          <IonImg src={wallet.state ? walletIcon : walletBlockedIcon} />
        </IonThumbnail>
        <IonLabel {...longPressEvent}>
          <h2>{wallet.name}</h2>
          <h3>{` ${formatMoney(wallet.balance)} ${
            wallet.currency_object.symbol
          }`}</h3>
        </IonLabel>
        <IonButton
          onClick={(e: any) => {
            e.persist();
            setShowPopoverOption({ showPopover: true, event: e });
          }}
          fill="clear"
        >
          <IonIcon icon={selectsIcon} />
        </IonButton>
      </IonItem>
      <IonPopover
        cssClass="wallet-item-popover"
        event={popoverOption.event}
        isOpen={popoverOption.showPopover}
        onDidDismiss={() =>
          setShowPopoverOption({ showPopover: false, event: undefined })
        }
      >
        <IonList>
          <IonButton
            routerLink={`/my/manage-wallets/${wallet.id}/share`}
            expand="full"
          >
            Share
          </IonButton>
          {wallet.state && (
            <IonButton
              routerLink={`/my/manage-wallets/${wallet.id}/transfer-money`}
              expand="full"
            >
              Transfer money
            </IonButton>
          )}
          {wallet.state && (
            <IonButton
              onClick={() => {
                console.log("hello");
              }}
              expand="full"
            >
              Edit
            </IonButton>
          )}
          <IonButton
            expand="full"
            onClick={(e: any) => {
              switchState();
              e.persist();
              setShowPopoverOption({ showPopover: false, event: undefined });
            }}
          >
            {wallet.state ? "Block" : "Unblock"}
          </IonButton>
          <IonButton
            expand="full"
            onClick={(e: any) => {
              e.persist();
              setShowPopoverOption({ showPopover: false, event: undefined });
              if (wallet.state) {
                setShowAlert(true);
              } else handleDelete();
            }}
          >
            Delete
          </IonButton>
        </IonList>
      </IonPopover>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={"Alert"}
        message="wallet is not locked"
        buttons={["OK"]}
      />
    </React.Fragment>
  );
};

export default WalletItem;
