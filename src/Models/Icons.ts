import { firestore } from "../firebase";

export interface Icons {
  icons: string[];
}

export function toIcons(
  doc: firebase.default.firestore.QueryDocumentSnapshot
): Icons {
  const icons: any = {
    ...doc.data(),
  };
  return icons as Icons;
}

export var icons: string[][] = [];

export function clearIcons() {
  icons = [];
}

export function initIcons() {
  const iconsRef = firestore.collection("icons");
  var data: string[] = [];
  return iconsRef
    .get()
    .then(({ docs }) => {
      docs.forEach((doc) => {
        data = data.concat(toIcons(doc).icons);
      });
    })
    .then(() => {
      const iconArr = [...data];
      const arr2d = [];
      while (iconArr.length) arr2d.push(iconArr.splice(0, 6));
      icons = arr2d;
    });
}
