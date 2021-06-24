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
import React from "react";
import { useHistory } from "react-router";
import { currencies } from "../../Models/Currencies";
import { Currency } from "../../Necessary/components";

interface props {
  handleSelect: (data: Currency) => void;
}

const SelectCurrencyUnit: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();

  const handleSelectItem = (data: Currency) => {
    handleSelect(data);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding"></IonBackButton>
          </IonButtons>
          <IonTitle>Select Currency Unit</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {currencies.map((child) => (
            <IonItem
              button
              key={child.id}
              onClick={() => handleSelectItem(child)}
            >
              <IonThumbnail slot="start">
                <IonImg src={child.icon} />
              </IonThumbnail>
              <IonLabel>
                <h2>{child.name}</h2>
                <h3>{child.iso}</h3>
                <h3>{child.rate_us}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SelectCurrencyUnit;
