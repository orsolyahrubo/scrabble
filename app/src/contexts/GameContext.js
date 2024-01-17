import { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export default function GameContextProvider({ children }) {

    const [errormessage, setErrorMessage] = useState(null);
    const [currentBoard, _setCurrentBoard] = useState(Array(15).fill(Array(15).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentTile, _setCurrentTile] = useState(null);
    const [currentMove, _setCurrentMove] = useState([]);

    async function makeFakeBoard() {
        const fakeTile = { value: 'A', score: 1, id: 'randomId12345678' };
        _setCurrentBoard(currentBoard => {
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

    async function getCurrentBoard() {
        return currentBoard;
    }

    async function setCurrentBoard(board) {
        _setCurrentBoard(board);
    }

    async function setCurrentTile(tile) {
        _setCurrentTile(tile);
    }

    async function setCurrentMove(move) {
        _setCurrentMove(move);
    }

    async function addToCurrentMove(tile) {
        _setCurrentMove([...currentMove, tile]);
    }

    useEffect(() => {
        makeFakeBoard();
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GameContext.Provider value={{
            errormessage, setErrorMessage, currentBoard, setCurrentTile, currentTile, setCurrentMove, currentMove, addToCurrentMove, setCurrentBoard, getCurrentBoard
        }}
        >
            {children}
        </GameContext.Provider>
    );
}