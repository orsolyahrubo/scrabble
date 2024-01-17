import { createContext, useState } from 'react';
import { playersTiles } from '../consts';

export const HandContext = createContext();

export default function HandContextProvider({ children }) {

    const [errormessage, setErrorMessage] = useState(null);
    const [currentHand, _setCurrentHand] = useState(playersTiles);

    async function setCurrentHand(tiles) {
        _setCurrentHand(tiles);
    }

    async function getCurrentHand() {
        return currentHand;
    }

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <HandContext.Provider value={{
            errormessage, setErrorMessage, currentHand, setCurrentHand, getCurrentHand
        }}
        >
            {children}
        </HandContext.Provider>
    );
}