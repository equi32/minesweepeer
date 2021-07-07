import React, { useEffect, useReducer } from 'react';
import { RESET_PROFILE, SET_PROFILE } from '../types';

export const AuthContext = React.createContext();

const initialState = {
    name: '',
    email: '',
    isAuth: false,
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_PROFILE:
        return {
          ...state,
          name: action.value.name,
          email: action.value.email,
          isAuth: false,
        };
      case RESET_PROFILE:
        sessionStorage.removeItem('profile');
        return initialState;
      default:
        throw state;
    }
  };
  
  const AuthContextProvider = ({ children }) => {
    const sessionState = JSON.parse(sessionStorage.getItem('profile'));
    const [profile, handleProfile] = useReducer(
      reducer,
      sessionState || initialState
    );
  
    useEffect(() => {
      sessionStorage.setItem('profile', JSON.stringify(profile));
    }, [profile]);
  
    const value = {
      profile,
      handleProfile,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export default AuthContextProvider;
  