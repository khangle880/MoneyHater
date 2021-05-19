import { firestore } from "../firebase";
import { Category, toCategory } from "../models";

export var categoryList: Category[] = [];

export function initCategoryList() {
  var data: Category[] = [];
  const categoriesRef = firestore.collection("categories");

  return categoriesRef.get().then(({ docs }) => {
    var promise = Promise.all(
      docs.map((doc) => {
        var newCategory = toCategory(doc);
        const childrenRef = doc.ref.collection("children");

        return childrenRef
          .get()
          .then(({ docs: subDocs }) => {
            let subCatagories: any[] = [];

            subDocs.forEach((child: any) => {
              subCatagories.push(toCategory(child));
            });

            newCategory = { ...newCategory, children: subCatagories };
          })
          .then(() => {
            data.push(newCategory);
          });
      })
    );
    return promise.then(() => {
      categoryList = data;
    });
  });
}
