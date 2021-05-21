import { firestore } from "../firebase";

export interface Event {
  id: string;
  name: string;
  from: string;
  to: string;
  icon: string;
  currency: string;
  consume: number;
  state: boolean;
}

export function toEvent(doc: any): Event {
  const event: any = {
    id: doc.id,
    ...doc.data(),
  };
  return event as Event;
}

export var events: Event[] = [];

export function clearEvents() {
  events = [];
}

export function initEvents(user_id: string, wallet_id: string) {
  const eventsRef = firestore
    .collection("users")
    .doc(user_id)
    .collection("wallets")
    .doc(wallet_id)
    .collection("events");

  return eventsRef.get().then(({ docs }) => {
    events = docs.map(toEvent);
  });
}
