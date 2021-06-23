import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router";
import { findCurrency, WalletEvent } from "../../Necessary/components";

import "./SelectWalletEvent.scss";

interface props {
  listEvent: WalletEvent[];
  handleSelect: (data: WalletEvent) => void;
}

const SelectWalletEvent: React.FC<props> = ({ listEvent, handleSelect }) => {
  const history = useHistory();

  const handleSelectItem = (data: WalletEvent) => {
    handleSelect(data);
    history.goBack();
  };

  const walletEventToView = (data: WalletEvent) => {
    const currency_object = findCurrency(data.currency);

    return (
      <IonItem className="event-item" key={data.id} onClick={() => handleSelectItem(data)}>
        <IonImg src={data.icon} />
        <IonLabel>
          <div>
            <p>{data.name}</p>
            <p>
              {currency_object.country}-{currency_object.iso}
            </p>
          </div>
        </IonLabel>
      </IonItem>
    );
  };

  return (
    <IonPage>
      {console.log(listEvent)}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding"></IonBackButton>
          </IonButtons>
          <IonTitle>Select Event</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {listEvent ? (
            listEvent.map(walletEventToView)
          ) : (
            <IonLabel
              style={{ fontSize: "1.5rem", color: "blue" }}
              className="label-center"
            >
              No Exist Event
            </IonLabel>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SelectWalletEvent;
