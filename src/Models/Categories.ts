import { firestore } from "../firebase";
import { Wallet } from "./Wallets";

export interface Category {
  id: string;
  type: string;
  name: string;
  icon: string;
  parent?: string;
  children?: Category[];
}

export function toCategory(
  doc: firebase.default.firestore.QueryDocumentSnapshot
): Category {
  const category: any = {
    id: doc.id,
    ...doc.data(),
  };
  return category as Category;
}

export function addCustomCategories(data: any, userId: string, wallet: Wallet) {
  firestore
    .collection("users")
    .doc(userId)
    .collection("wallets")
    .doc(wallet.id)
    .collection("custom_categories")
    .add(data)
    .then((docRef) => {
      const id = docRef.id;
      wallet.categories
        .find((category) => category.id === data.parent)
        ?.children?.push({ id, ...data } as Category);
    });
}

export var categories: Category[] = [];

export function clearCategories() {
  categories = [];
}

export function initCategories() {
  const categoriesRef = firestore.collection("categories");
  return categoriesRef.get().then(({ docs }) => {
    var data: Category[] = [];
    return Promise.all(
      docs.map((doc) => {
        var newCategory = toCategory(doc);
        const childrenRef = doc.ref.collection("children");

        return childrenRef.get().then(({ docs: subDocs }) => {
          let subCatagories: any[] = [];

          subDocs.forEach((child: any) => {
            subCatagories.push(toCategory(child));
          });

          data.push({ ...newCategory, children: subCatagories });
        });
      })
    ).then(() => {
      categories = data;
    });
  });
}
