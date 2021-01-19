import React from "react";
import { Route, Switch } from 'react-router-dom';
import { CreatePlan, ManagePlan, Guide } from ".";

const Main = () => {
	return (
		<>
			<Switch>
				<Route exact path="/Create" component={ CreatePlan }/>
				<Route exact path="/Guide" component={ Guide }/>
				<Route exact path="/:url" component={ ManagePlan }/>
			</Switch>
		</>
	);
};

export default Main;
