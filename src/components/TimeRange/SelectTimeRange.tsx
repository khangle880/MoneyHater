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
import dayjs from "dayjs";
import { availableTimeRange, TimeRange } from "../../Necessary/components";

import "./SelectTimeRange.scss";

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
          detail={false}
          button
          key={timeRange.label}
          onClick={() => {
            handleSelectItem(timeRange);
          }}
        >
          <div className="time-label-container">
            <p>{timeRange.label}:</p>
            <p>{`${fromDate.format(fromDateFormat)} - ${toDate.format(
              toDateFormat
            )}`}</p>
          </div>
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
      <IonContent className="time-range-content ion-padding">
        <IonList>
          {availableTimeRange.map(timeRangeToItem)}
          <IonItem
            detail={false}
            button
            onClick={(e: any) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          >
            <div className="time-label-container">
              <p>Custom</p>
              <p>--------</p>
            </div>
          </IonItem>
        </IonList>
        <IonPopover
          cssClass="time-range-popover"
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() =>
            setShowPopover({ showPopover: false, event: undefined })
          }
        >
          <IonList>
            <IonLabel>
              <p className="ion-text-center" style={{fontSize: "1.1rem", fontWeight:500, marginTop:"10px"}}>SELECT TIME</p>
            </IonLabel>
            <div className="time-label-popover">
              <p>From: </p>
              <IonDatetime
                value={fromDate}
                displayFormat="DDD, DD/MM/YYYY"
                onIonChange={(event) => setFrom(event.detail.value!)}
              />
            </div>

            <div className="time-label-popover">
              <p>To: </p>
              <IonDatetime
                displayFormat="DDD, DD/MM/YYYY"
                value={toDate}
                onIonChange={(event) => setTo(event.detail.value!)}
              />
            </div>
            
            <IonButtons slot="end">
              <div className="time-buttons-popover">
                <IonButton className="time-popover-cancel"
                  onClick={() =>
                    setShowPopover({ showPopover: false, event: undefined })
                  }
                >
                  Cancel
                </IonButton>
                <IonButton className="time-popover-select"
                  onClick={() => {
                    handleSelectItem({
                      label: "Custom",
                      from: fromDate,
                      to: toDate,
                    });
                    setShowPopover({ showPopover: false, event: undefined });
                  }}
                >
                  Select
                </IonButton>
              </div>
            </IonButtons>
          </IonList>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
};

export default SelectTimeRange;
