import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [tokenInContext, setTokenInContext] = useState(getTokenFromLocalStorage());
  const [loggedInUser, setLoggedInUser] = useState(null);

  function getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      return token;
    }
    return null;
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{
      tokenInContext, setTokenInContext, getTokenFromLocalStorage
    }}
    >
      {children}
    </UserContext.Provider>
  );
}