import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  availableTimeRange,
  TimeRange,
} from "../../Models/LocalModels/TimeRange";
import dayjs from "dayjs";

interface props {
  handleSelect: (data: TimeRange) => void;
}

const SelectTimeRange: React.FC<props> = ({ handleSelect }) => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [fromDate, setFrom] = useState(new Date().toISOString());
  const [toDate, setTo] = useState(new Date().toISOString());

  const history = useHistory();

  const handleSelectItem = (data: TimeRange) => {
    handleSelect(data);
    history.goBack();
  };

  const timeRangeToItem = (timeRange: TimeRange) => {
    const today = dayjs();
    const fromDate = dayjs(timeRange.from);
    const toDate = dayjs(timeRange.to);
    const fromDateFormat =
      fromDate.year() !== today.year() ? "DD/MM/YYYY" : "DD/MM";
    const toDateFormat =
      toDate.year() !== today.year() ? "DD/MM/YYYY" : "DD/MM";

    if (timeRange.label !== "Custom")
      return (
        <IonItem
          button
          key={timeRange.label}
          onClick={() => {
            handleSelectItem(timeRange);
          }}
        >
          <IonLabel>
            <h2>{timeRange.label}</h2>
            <h2>{`${fromDate.format(fromDateFormat)} - ${toDate.format(
              toDateFormat
            )}`}</h2>
          </IonLabel>
        </IonItem>
      );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton className="icon-padding"></IonBackButton>
          </IonButtons>
          <IonTitle>Select Time Range</IonTitle>
          <IonButtons slot="end">
            <IonButton size="large" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {availableTimeRange.map(timeRangeToItem)}
          <IonItem
            button
            onClick={(e: any) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          >
            <IonLabel>
              <h2>Custom</h2>
              <h2>--------</h2>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonPopover
          cssClass="my-custom-class"
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() =>
            setShowPopover({ showPopover: false, event: undefined })
          }
        >
          <IonList>
            <IonLabel>
              <h1>Select Time</h1>
            </IonLabel>
            <IonLabel>From: </IonLabel>
            <IonDatetime
              value={fromDate}
              displayFormat="DDD, DD/MM/YYYY"
              onIonChange={(event) => setFrom(event.detail.value!)}
            />
            <IonLabel>To: </IonLabel>
            <IonDatetime
              displayFormat="DDD, DD/MM/YYYY"
              value={toDate}
              onIonChange={(event) => setTo(event.detail.value!)}
            />
            <IonButtons slot="end">
              <IonButton
                onClick={() =>
                  setShowPopover({ showPopover: false, event: undefined })
                }
              >
                CANCEL
              </IonButton>
              <IonButton
                onClick={() => {
                  handleSelectItem({
                    label: "Custom",
                    from: fromDate,
                    to: toDate,
                  });
                  setShowPopover({ showPopover: false, event: undefined });
                }}
              >
                SELECT TIME
              </IonButton>
            </IonButtons>
          </IonList>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default SelectTimeRange;
