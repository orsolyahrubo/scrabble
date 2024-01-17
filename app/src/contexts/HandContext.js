import { createContext, useState, useEffect } from 'react';
import { playersTiles } from '../consts';

export const HandContext = createContext();

export default function HandContextProvider({ children }) {

   const [errormessage, setErrorMessage] = useState(null);
   const [currentHand, setCurrentHand] = useState(playersTiles);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <HandContext.Provider value={{
            errormessage, setErrorMessage, currentHand, setCurrentHand
        }}
        >
            {children}
        </HandContext.Provider>
    );
}