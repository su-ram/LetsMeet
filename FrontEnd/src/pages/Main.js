import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreatePlan, ManagePlan, PlaceMain, SearchPlace, Guide } from ".";

const Main = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ CreatePlan } />
        <Route exact path="/Create" component={ CreatePlan } />
        <Route exact path="/Place" component={ PlaceMain } />
		<Route exact path="/Guide" component={ Guide }/>
        <Route
          exact
          path="/SearchPlace/:longCenter/:latCenter"
          component={SearchPlace}
        />
        <Route exact path="/:url" component={ ManagePlan } />
      </Switch>
    </>
  );
};

export default Main;
