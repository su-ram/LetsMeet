import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreatePlan, ManagePlan, PlaceMain } from ".";

const Main = () => {
  return (
    <>
      <Switch>
        <Route exact path="/Create" component={CreatePlan} />
        <Route exact path="/Place" component={PlaceMain} />
        <Route exact path="/:url" component={ManagePlan} />
      </Switch>
    </>
  );
};

export default Main;
