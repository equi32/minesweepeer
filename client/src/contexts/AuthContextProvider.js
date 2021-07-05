import React, { useEffect, useReducer } from 'react';

export const AuthContext = React.createContext();

const initialState = {
    name: '',
    profileImage: '',
    isAuth: false,
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'setProfile':
        return {
          ...state,
          name: action.value.name,
          profileImage: action.value.profileImage,
          isAuth: false,
        };
      case 'resetProfile':
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
  