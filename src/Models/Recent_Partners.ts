import { firestore } from "../firebase";

export interface Partner {
  id: string;
  name: string;
  time: string;
}

export function toPartner(doc: any): Partner {
  const partner: any = {
    id: doc.id,
    ...doc.data(),
  };
  return partner as Partner;
}

export var recentPartners: Partner[] = [];

export function clearRecentPartners() {
  recentPartners = [];
}

export function initRecentPartners(user_id: string) {
  const recentPartnersRef = firestore
    .collection("users")
    .doc(user_id)
    .collection("recent_partners")
    .orderBy("time", "desc");

  return recentPartnersRef.get().then(({ docs }) => {
    recentPartners = docs.map(toPartner);
  });
}

export function addPartner(data: any, userId: string) {
  const recentPartnersRef = firestore
    .collection("users")
    .doc(userId)
    .collection("recent_partners");
  recentPartnersRef.add(data).then((docRef) => {
    const id = docRef.id;
    recentPartners.unshift({ id, ...data } as Partner);
  });

  if (recentPartners.length > 5) {
    recentPartnersRef.doc(recentPartners.pop()?.id).delete();
  }
}
