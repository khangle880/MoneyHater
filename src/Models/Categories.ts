import { firestore } from "../firebase";

export interface Category {
  id: string;
  type: string;
  name: string;
  icon: string;
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
      console.log(data);
      categories = data;
    });
  });
}
