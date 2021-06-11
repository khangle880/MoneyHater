import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Route, useHistory, useRouteMatch } from "react-router";
import { categories, Category } from "../../Models/Categories";
import AddCustomCategory from "../AddCustomCategory/AddCustomCategory";
import CategoryItem from "./CategoryItem";

interface props {
  handleSelect: (data: Category) => void;
}

const SelectCategory: React.FC<props> = ({ handleSelect }) => {
  const history = useHistory();

  const rootPath = useRouteMatch().path;

  const handleSelectItem = (data: Category) => {
    handleSelect(data);
    history.goBack();
  };

  return (
    <IonPage>
      <Route exact path={`${rootPath}/add-custom`}>
        <AddCustomCategory type="Expense" beforePath={rootPath} />
      </Route>
      <Route path={`${rootPath}`}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton className="icon-padding" />
            </IonButtons>
            <IonTitle>Select Category</IonTitle>
            <IonButtons slot="end">
              <IonButton size="large" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <ul>
            {categories?.map((category) => (
              <CategoryItem
                key={category.id}
                handleClick={handleSelectItem}
                data={category}
              />
            ))}

            <IonButton routerLink={`${rootPath}/add-custom`}>
              New Category
            </IonButton>
          </ul>
        </IonContent>
      </Route>
    </IonPage>
  );
};

export default SelectCategory;
