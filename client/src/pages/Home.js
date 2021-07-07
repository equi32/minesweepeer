import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Board from './Board/Board';
import Login from './Login';
import Main from './Main';
import NewGame from './NewGame';
import LoadGame from './LoadGame';

const Home = () => (
    <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/game/new" render={() => <NewGame />} />
        <Route exact path="/game/load" render={() => <LoadGame />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/game/play" render={() => <Board />} />
    </Switch>
);
 
export default Home;