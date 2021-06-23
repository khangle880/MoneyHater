import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { checkmarkOutline as checkIcon } from "ionicons/icons";

import "./TakeNote.scss";

interface props {
  handleNote: (data: string) => void;
  currentValue: string;
}

const TakeNote: React.FC<props> = ({ currentValue, handleNote }) => {
  const [note, setNote] = useState(currentValue);
  const history = useHistory();

  const handleGetNote = (data: string) => {
    handleNote(data);
    history.goBack();
  };

  return (
    <IonPage className="take-note-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding"></IonBackButton>
          </IonButtons>
          <IonTitle>Note</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                handleGetNote(note);
              }}
            >
              <IonIcon icon={checkIcon} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonTextarea
          autoGrow={true}
          placeholder="Note"
          value={note}
          onIonChange={(event) => {
            setNote(event.detail.value!);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default TakeNote;
