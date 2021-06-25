import {
  IonLabel,
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonIcon,
  IonAvatar,
  IonBadge,
} from "@ionic/react";
//? ICON
import React, { useEffect, useState } from "react";
import { currentWallet, Transaction } from "../../../Necessary/components";
import TransactionsItem from "./TransactionItem";

//? STYLED
import "./Transactions.scss";

//? IMAGE

//? ICON
import {
  notifications,
  walletOutline,
  gitPullRequestOutline,
  bookmarkOutline,
  cashOutline,
  add,
  remove,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { avatarIcon } from "../../../Necessary/icons";
import _ from "underscore";
import dayjs from "dayjs";

const Transactions: React.FC = () => {
  const history = useHistory();
  const [transactions, setTransactions] = useState<Transaction[]>(
    currentWallet.transactions
  );
  const [needRender, setNeedRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNeedRender(!needRender);
    }, 2000);
  }, [needRender]);

  const RedirectToProfile = () => {
    history.push("/my/profile");
  };

  const [isIconTransferActive, setIsIconTransferActive] = useState(false);
  const [isIconDebtActive, setIsIconDebtActive] = useState(false);
  const [isIconLoanActive, setIsIconLoanActive] = useState(false);
  const [isIconTopUpActive, setIsIconTopUpActive] = useState(false);

  //? Handle switch feature
  const IconSendClick = () => {
    if (isIconTransferActive) {
      setIsIconTransferActive(false);
      return;
    }
    setIsIconTransferActive(true);
    setIsIconTopUpActive(false);
    setIsIconDebtActive(false);
    setIsIconLoanActive(false);
  };
  const IconDepositClick = () => {
    if (isIconTopUpActive) {
      setIsIconTopUpActive(false);
      return;
    }
    setIsIconTransferActive(false);
    setIsIconTopUpActive(true);
    setIsIconDebtActive(false);
    setIsIconLoanActive(false);
  };
  const IconRequestClick = () => {
    if (isIconDebtActive) {
      setIsIconDebtActive(false);
      return;
    }
    setIsIconTransferActive(false);
    setIsIconTopUpActive(false);
    setIsIconDebtActive(true);
    setIsIconLoanActive(false);
  };
  const IconLoanClick = () => {
    if (isIconLoanActive) {
      setIsIconLoanActive(false);
      return;
    }
    setIsIconTransferActive(false);
    setIsIconTopUpActive(false);
    setIsIconDebtActive(false);
    setIsIconLoanActive(true);
  };

  const transactionsToView = (data: Transaction[] | undefined) => {
    if (data) {
      const newData = [...data];
      newData.forEach((child) => {
        child.executed_time = dayjs(child.executed_time)
          .startOf("d")
          .toISOString();
      });

      const grouped = _.chain(newData)
        .sortBy("executed_time")
        .groupBy("executed_time")
        .map(function (value, key) {
          return {
            date: key,
            transactions: value,
          };
        })
        .value()
        .reverse();

      return grouped.map((byDate) => {
        const dateTransactions = dayjs(byDate.date);
        const diff = dayjs().diff(dateTransactions);
        var date =
          diff === 0
            ? "Today"
            : diff === 1
            ? "Yesterday"
            : diff === -1
            ? "Tomorrow"
            : dateTransactions.format("DD/MM/YYYY");

        if (byDate.date === "") date = "Unknown";

        return (
          <div className="recent-card" key={byDate.date}>
            <p className="date-text ion-text-center">{date}</p>
            <div className="recent-container">
              <div className="recent-items">
                {byDate.transactions.map((child) => (
                  <TransactionsItem
                    key={child.id}
                    updateTransactions={(newData: Transaction[]) => {
                      setTransactions([...newData]);
                    }}
                    data={child}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      });
    } else
      return (
        <IonLabel
          style={{ fontSize: "1.5rem", color: "blue" }}
          className="label-center"
        >
          No Exist Transactions
        </IonLabel>
      );
  };

  return (
    <IonPage>
      <IonContent
        className="transaction-content"
        fullscreen
        forceOverscroll={true}
        scrollY={false}
      >
        {/*//? TOP BAR CONTAINER  */}
        <div className="top-container">
          <div className="sub-container">
            <p>
              {currentWallet.currency_object
                ? `${currentWallet.balance} ${currentWallet.currency_object.symbol}`
                : "Not available!"}
            </p>
            <div>
              <div className="notification-container">
                <IonIcon
                  className="notification-icon animated"
                  icon={notifications}
                />
                <IonBadge className="notification-badge">2</IonBadge>
                <IonAvatar>
                  <img
                    src={avatarIcon}
                    alt="avatar"
                    onClick={RedirectToProfile}
                  />
                </IonAvatar>
              </div>
            </div>
          </div>
          <p className="sub-text">Available balance</p>

          {/*//? TOP BAR ICON BUTTONS */}
          <div className="tab-container">
            <span
              className={`${isIconTransferActive ? "active" : ""}`}
              onClick={IconSendClick}
            >
              <IonIcon icon={walletOutline} />
              <p>Transfer</p>
            </span>
            <span
              className={`${isIconDebtActive ? "active" : ""}`}
              onClick={IconRequestClick}
            >
              <IonIcon icon={gitPullRequestOutline} />
              <p>Debt</p>
            </span>
            <span
              className={`${isIconLoanActive ? "active" : ""}`}
              onClick={IconLoanClick}
            >
              <IonIcon icon={bookmarkOutline} />
              <p>Loan</p>
            </span>
            <span
              className={`${isIconTopUpActive ? "active" : ""}`}
              onClick={IconDepositClick}
            >
              <IonIcon icon={cashOutline} />
              <p>Deposit</p>
            </span>
          </div>
        </div>

        <IonCard className="home-card">
          {/* CARD INFO  */}
          <div className="top-recent">
            <div className="top-header">
              <p className="header-text">Recent Transactions</p>
              <p>Expand</p>
            </div>
            <div className="top-icon"></div>
          </div>

          {/*  3 FILTER BUTTONS  */}
          <div className="top-button">
            <IonButton>
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>All</p>
            </IonButton>

            <IonButton>
              <IonIcon icon={remove} slot="start" style={{ color: "red" }} />
              <p>Expend</p>
            </IonButton>

            <IonButton>
              <IonIcon icon={add} slot="start" style={{ color: "green" }} />
              <p>Income</p>
            </IonButton>
          </div>

          {/*//? CARD'S TRANSACTION HISTORY  */}
          {transactionsToView(transactions)}
        </IonCard>
      </IonContent>

      {/* <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/my/transactions/add">
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab> */}
    </IonPage>
  );
};

export default Transactions;
