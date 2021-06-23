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
      while (iconArr.length) arr2d.push(iconArr.splice(0, 4));
      icons = arr2d;
    });
}

export const fakeIcons = () => {
  const data = [
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
    [
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-account-64.svg?alt=media&token=6c4b5580-6108-426c-90c0-ed85b1deea15",
      "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-add-64.svg?alt=media&token=f6bcde9c-1bad-4ba1-8cb0-835193209986",
    ],
  ];
  icons = data;
};
