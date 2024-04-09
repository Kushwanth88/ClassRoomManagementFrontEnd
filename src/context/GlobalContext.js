import React, { createContext, useReducer } from 'react';

// Define your state and actions
const initialState = { user: null, isLoggedIn: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log("Login", action.payload)
      return { user: action.payload, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false };
    default:
      return state;
  }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};