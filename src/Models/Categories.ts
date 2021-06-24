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

export function findCategory(id: string): Category | undefined {
  var result;
  categories.forEach((category) => {
    if (id === category.id) {
      result = category;
    } else {
      const match = category.children?.find(
        (subCategory) => subCategory.id === id
      );
      if (match) result = match;
    }
  });
  return result || undefined;
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

export const fakeCategories = () => {
  const data = [
    {
      id: "11249",
      type: "Income",
      name: "back-end",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "70004",
          type: "Expense",
          name: "CSS",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "4534",
          type: "Expense",
          name: "interface",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "93275",
          type: "Expense",
          name: "optical",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "77741",
          type: "Expense",
          name: "Profound",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "97910",
          type: "Expense",
          name: "deposit",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "44492",
          type: "Expense",
          name: "Manager",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "92636",
      type: "Expense",
      name: "Operations",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "69648",
          type: "Expense",
          name: "Ball",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "72041",
          type: "Expense",
          name: "one-to-one",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "70683",
          type: "Expense",
          name: "Venezuela",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "80132",
          type: "Expense",
          name: "Principal",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "92027",
          type: "Expense",
          name: "Direct",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "60884",
          type: "Expense",
          name: "Pound",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "89038",
      type: "Expense",
      name: "open-source",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "89617",
          type: "Expense",
          name: "Guinea",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "48953",
          type: "Expense",
          name: "yellow",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "52617",
          type: "Expense",
          name: "matrix",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "32662",
          type: "Expense",
          name: "Missouri",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "8760",
          type: "Expense",
          name: "Gorgeous",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "55861",
          type: "Expense",
          name: "Cheese",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "94975",
      type: "Income",
      name: "Strategist",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "32442",
          type: "Expense",
          name: "Director",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "6625",
          type: "Expense",
          name: "feed",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "3636",
          type: "Expense",
          name: "navigating",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "64415",
          type: "Expense",
          name: "Orchestrator",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "84365",
          type: "Expense",
          name: "system",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "46347",
          type: "Expense",
          name: "Cambridgeshire",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "16393",
      type: "Income",
      name: "District",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "11430",
          type: "Expense",
          name: "Consultant",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "49709",
          type: "Expense",
          name: "Avenue",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "94629",
          type: "Expense",
          name: "Views",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "4562",
          type: "Expense",
          name: "revolutionize",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "56401",
          type: "Expense",
          name: "lavender",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "56138",
          type: "Expense",
          name: "withdrawal",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "77501",
      type: "Income",
      name: "Kids",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "78691",
          type: "Expense",
          name: "architectures",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "83438",
          type: "Expense",
          name: "Steel",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "75465",
          type: "Expense",
          name: "Account",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "12242",
          type: "Expense",
          name: "grid-enabled",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "36639",
          type: "Expense",
          name: "XSS",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "32395",
          type: "Expense",
          name: "project",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "55199",
      type: "Debt & Loan",
      name: "management",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "79395",
          type: "Expense",
          name: "Research",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "37196",
          type: "Expense",
          name: "ROI",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "1953",
          type: "Expense",
          name: "haptic",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "63851",
          type: "Expense",
          name: "Human",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "84433",
          type: "Expense",
          name: "flexibility",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "92197",
          type: "Expense",
          name: "Refined",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "61120",
      type: "Debt & Loan",
      name: "Consultant",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "50013",
          type: "Expense",
          name: "modular",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "89404",
          type: "Expense",
          name: "ADP",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "49625",
          type: "Expense",
          name: "Bedfordshire",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "72834",
          type: "Expense",
          name: "Chicken",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "28309",
          type: "Expense",
          name: "Corporate",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "98454",
          type: "Expense",
          name: "Small",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
      ],
    },
    {
      id: "84124",
      type: "Debt & Loan",
      name: "Synergized",
      icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
      children: [
        {
          id: "48404",
          type: "Expense",
          name: "system",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "54333",
          type: "Expense",
          name: "Pants",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "96751",
          type: "Expense",
          name: "Rustic",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "66839",
          type: "Expense",
          name: "synergy",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "59383",
          type: "Expense",
          name: "Ergonomic",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "72392",
          type: "Expense",
          name: "JBOD",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-bank-64.svg?alt=media&token=6c5a66f1-2600-49bb-a1a5-484c32371809",
        },
        {
          id: "dGux8eIeZ9GWjPxLpps4",
          type: "Expense",
          name: "Other Expense",
          icon: "https://firebasestorage.googleapis.com/v0/b/moneyhater-e3629.appspot.com/o/icon%2Ficons8-used-product-64.svg?alt=media&token=045e8568-6cdc-4151-97dc-b7295cabc0a8",
        },
      ],
    },
  ];
  categories = data;
};
