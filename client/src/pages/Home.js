import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Board from './Board/Board';
import Main from './Main';

const Home = () => (
    <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/play" render={() => <Board />} />
    </Switch>
);
 
export default Home;