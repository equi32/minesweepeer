import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';

import Layout from './Layout';

import { AuthContext } from '../contexts/AuthContextProvider';

import api from '../helpers/api';
import apiMethods from '../constants/apiMethods';
import routes from '../constants/routes';
import en from '../lang/en';

import { setJwtToken } from '../helpers/authHelper';
import { SET_PROFILE } from '../types';
import { showErrorMessage, waitingMessage } from '../components/Alert/Alert';
import Swal from 'sweetalert2';

const Register = () => {
    //History
    const history = useHistory();
    //Context
    const { handleProfile } = useContext(AuthContext)
    //Local state
    const [ userData, setData ] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    //Handle changes
    const handleOnChange = e => {
        setData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    //Handle the submit
    const handleSubmit = async e => {
        e.preventDefault();
        //Check the data
        if(userData.name && userData.email && userData.password){
            //Loading
            waitingMessage(en.REGISTERING);

            try{
                const response = await api
                    .get(process.env.REACT_APP_SANCTUM_URL)
                    .then(response => {
                        return api
                        .post(apiMethods.REGISTER, userData)
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
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    { en.REGISTER_TITLE }
                </h2>
            </div>
            <form className="mt-8 space-y-6 flex content-center justify-center" onSubmit={handleSubmit} autoComplete="off">
                <div className="w-1/2">
                    <div className="rounded-md shadow-sm -space-y-px mb-2">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input 
                                id="name" 
                                name="name" 
                                type="text" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Your name"
                                autoFocus
                                value={userData.name}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Email address"
                                autoFocus
                                value={userData.email}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Password" 
                                value={userData.password}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password_confirmation" 
                                name="password_confirmation" 
                                type="password" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Confirm Password" 
                                value={userData.password_confirmation}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            { en.REGISTER.toUpperCase() }
                        </button>
                        <small className="mt-2">
                            Already registered?,&nbsp;
                            Go to login <Link className="text-blue-800 font-medium" to={ routes.LOGIN }>here</Link>.
                        </small>
                    </div>
                </div>
            </form>
        </Layout>
    );
};
 
export default Register;