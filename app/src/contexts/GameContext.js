import { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export default function GameContextProvider({ children }) {

    const [errormessage, setErrorMessage] = useState(null);
    const [currentBoard, setCurrentBoard] = useState(Array(15).fill(Array(15).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentTile, setCurrentTile] = useState(null);
    const [currentMove, setCurrentMove] = useState(null);


    async function makeFakeBoard() {
        const fakeTile = { value: 'A', score: 1 };
        setCurrentBoard(currentBoard => {
            const newBoard = currentBoard.map((row, rowIndex) => {
                return row.map((element, columnIndex) => {
                    if (rowIndex === 3 && columnIndex === 2) {
                        return fakeTile;
                    }
                    return element;
                });
            });
            return newBoard;
        });
    }

    useEffect(() => {
        makeFakeBoard();
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GameContext.Provider value={{
            errormessage, setErrorMessage, currentBoard, setCurrentTile
        }}
        >
            {children}
        </GameContext.Provider>
    );
}