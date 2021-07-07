import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Board from './Board/Board';
import Login from './Login';
import Main from './Main';
import NewGame from './NewGame';
import LoadGame from './LoadGame';
import Register from './Register';

import routes from '../constants/routes';
import { isJwtTokenStored } from '../helpers/authHelper';

const privateRoutes = [
    {
        path: routes.HOME,
        component: Main
    },
    {
        path: routes.NEW_GAME,
        component: NewGame
    },
    {
        path: routes.LOAD_GAME,
        component: LoadGame
    },
    {
        path: routes.PLAY_GAME,
        component: Board
    }
];

const PrivateRoute = ({ path, component: Component }) => (
    <Route
        exact
        path={path}
        render={ props => 
            isJwtTokenStored() ? (
                <Component {...props} />
            ) : (
                <Redirect to={routes.LOGIN} />
            )
        }
    />
);

const Home = () => (
    <Switch>
        <Route exact path={ routes.LOGIN } render={() => <Login />} />
        <Route exact path={ routes.REGISTER } render={() => <Register />} />
        {
            privateRoutes.map(route => (
                <PrivateRoute key={route.path} {...route} exact />
            ))
        }
        <Route
            path="*"
            render={() => (
                <Redirect to={isJwtTokenStored() ? routes.HOME : routes.LOGIN} />
            )}
        />
    </Switch>
);
 
export default Home;