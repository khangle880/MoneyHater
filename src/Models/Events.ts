// import { firestore } from "../firebase";

import { firestore } from "../firebase";
import { Wallet } from "./Wallets";

export interface WalletEvent {
  id: string;
  name: string;
  from: string;
  to: string;
  icon: string;
  currency: string;
  state: boolean;
}

export function toWalletEvent(doc: any): WalletEvent {
  const event: any = {
    id: doc.id,
    ...doc.data(),
  };
  return event as WalletEvent;
}

export function addWalletEvent(data: any, userId: string, wallet: Wallet) {
  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .collection("recurring_transactions")
    .add(data)
    .then((docRef) => {
      const id = docRef.id;
      wallet.events.push({
        id,
        ...data,
      } as WalletEvent);
    });
}
// export var events: Event[] = [];

// export function clearEvents() {
//   events = [];
// }

// export function initEvents(user_id: string, wallet_id: string) {
//   const eventsRef = firestore
//     .collection("users")
//     .doc(user_id)
//     .collection("wallets")
//     .doc(wallet_id)
//     .collection("events");

//   return eventsRef.get().then(({ docs }) => {
//     events = docs.map(toEvent);
//   });
// }
