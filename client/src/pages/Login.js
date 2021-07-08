import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';

import Layout from './Layout';
import GameTitle from '../components/Common/GameTitle';

import { AuthContext } from '../contexts/AuthContextProvider';

import api from '../helpers/api';
import apiMethods from '../constants/apiMethods';
import routes from '../constants/routes';
import en from '../lang/en';

import { setJwtToken } from '../helpers/authHelper';
import { SET_PROFILE } from '../types';
import { showErrorMessage, waitingMessage } from '../components/Alert/Alert';
import Swal from 'sweetalert2';

const Login = () => {
    //History
    const history = useHistory();
    //Context
    const { handleProfile } = useContext(AuthContext)
    //Local state
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    //Handle changes
    const handleOnChangeEmail = e => {
        setEmail(e.target.value);
    }
    const handleOnChangePassword = e => {
        setPassword(e.target.value);
    }
    //Handle the submit
    const handleSubmit = async e => {
        e.preventDefault();
        //Check the data
        if(email && password){
            //Loading
            waitingMessage(en.LOGGING_IN);

            try{
                const response = await api
                    .get(process.env.REACT_APP_SANCTUM_URL)
                    .then(response => {
                        return api
                        .post(apiMethods.LOGIN, {
                            email,
                            password
                        })
                        .then(response => {
                            return response;
                        });
                    });
                //Take the data
                const { data: { data, success, message } } = response;
                //Check response
                if(success){
                    //Set the token
                    setJwtToken(data.token);
                    //Save profile
                    handleProfile({
                        type: SET_PROFILE,
                        value: {
                            name: data.user.name,
                            email: data.user.email,
                            isAuth: Boolean(data.token)
                        }
                    });
                    //Redirect to home
                    history.push(routes.HOME);
                }else{
                    //Show message
                    showErrorMessage(message);
                }
                //Hide
                Swal.close();
            }catch(error){
                //Hide
                Swal.close();
                //Check errors
                if (error.response && error.response.status === StatusCodes.NOT_FOUND) {
                    showErrorMessage(error.response.data.message);
                } else {
                    showErrorMessage();
                }
            }
        }else{
            //Show message
            showErrorMessage('You should complete the form!')
        }
    }
    //Render
    return (
        <Layout halfWidth>
            <div>
                <GameTitle />
                <h2 data-cy="login-title" className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                    { en.SIGN_IN_TITLE }
                </h2>
            </div>
            <form 
                className="mt-8 space-y-6 flex content-center justify-center" 
                onSubmit={handleSubmit}
                data-cy="login-form"
            >
                <div className="w-1/2">
                    <div className="rounded-md shadow-sm -space-y-px mb-2">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                data-cy="login-email" 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Email address"
                                autoFocus
                                value={email}
                                onChange={handleOnChangeEmail}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                data-cy="login-password"  
                                id="password" 
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Password" 
                                value={password}
                                onChange={handleOnChangePassword}
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <button 
                            type="submit" 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            data-cy="login-submit" 
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            { en.SIGN_IN }
                        </button>
                        <small className="mt-2">
                            Not user?,&nbsp;
                            Please register <Link data-cy="login-register-link" className="text-blue-800 font-medium" to={ routes.REGISTER }>here</Link>.
                        </small>
                    </div>
                </div>
            </form>
        </Layout>
    );
};
 
export default Login;