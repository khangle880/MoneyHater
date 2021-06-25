import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Events.scss";

import { add as addIcon } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import {
  currentWallet,
  findCurrency,
  WalletEvent,
} from "../../../../Necessary/components";
import dayjs from "dayjs";

const Events: React.FC = () => {
  const [needRender, setNeedRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNeedRender(!needRender);
    }, 2000);
  }, [needRender]);

  const eventToView = (event: WalletEvent) => {
    const list = currentWallet.transactions.filter(
      (child) =>
        child.executed_time >= event.from &&
        child.executed_time <= event.to &&
        child.event === event.name
    );

    const event_currency = findCurrency(event.currency);

    // calculate by event
    var consume = 0;
    list.forEach((child) => {
      const amount = child.amount_by_wallet;
      const currencyWallet = currentWallet.currency_object;
      consume += parseFloat(
        ((amount / currencyWallet!.rate_us) * event_currency.rate_us).toFixed(2)
      );
    });

    return (
      <IonCard className="event-card" key={event.id}>
        <div className="event-detail-container">
          <div>
            <IonImg src={event.icon} />
            <div className="top-detail">
              <p className="detail-name">{event.name}</p>
              <p className="detail-date">
                {dayjs(event.to).format("DD/MM/YY")}
              </p>
            </div>
          </div>
          <div className="detail-consume">
            <p>Consume</p>
            <p>
              {consume} {event_currency.symbol}
            </p>
          </div>
        </div>
      </IonCard>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/planning" />
          </IonButtons>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding events-content">
        {currentWallet.events ? (
          currentWallet.events.map(eventToView)
        ) : (
          <IonLabel
            style={{ fontSize: "1.5rem", color: "blue" }}
            className="centered"
          >
            Not Exist
          </IonLabel>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/my/events/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Events;
