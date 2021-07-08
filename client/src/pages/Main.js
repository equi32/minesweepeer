import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from './Layout';

import en from '../lang/en';
import routes from '../constants/routes';

import { AuthContext } from '../contexts/AuthContextProvider';
import { RESET_PROFILE } from '../types';
import { removeJwtToken } from '../helpers/authHelper';

const Main = () => {
    //History
    const history = useHistory();
    //Context
    const { profile, handleProfile } = useContext(AuthContext);
    //Handle logout
    const handleLogout = () => {
        removeJwtToken();
        handleProfile({ type: RESET_PROFILE });
        history.push(routes.LOGIN);
    }
    //Render
    return (
        <Layout halfWidth>
            <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                        <h2 data-cy="main-title" className="text-3xl font-extrabold text-gray-900">
                            { `${en.WELCOME} ${profile.name}` }
                        </h2>
                        Select one option to begin
                    </div>
                    <div className="text-right">
                        <button 
                            data-cy="main-logout"
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleLogout}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-8 space-y-6 flex content-center justify-center">
                <div className="w-1/2">
                    <div className="mb-2">
                        <Link 
                            data-cy="main-new"
                            to={routes.NEW_GAME} 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            { en.NEW_GAME.toUpperCase() }
                        </Link>
                    </div>
                    <div className="mb-2">
                        <Link 
                            data-cy="main-load"
                            to={routes.LOAD_GAME} 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </span>
                            { en.LOAD_GAME.toUpperCase() }
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
export default Main;