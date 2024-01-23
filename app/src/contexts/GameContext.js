import { createContext, useState, useEffect } from 'react';
import { playersTiles } from '../consts';

export const GameContext = createContext();

export default function GameContextProvider({ children }) {

    const [errormessage, setErrorMessage] = useState(null);
    const [currentBoard, _setCurrentBoard] = useState(Array(15).fill(Array(15).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentTile, _setCurrentTile] = useState(null);
    const [currentMove, _setCurrentMove] = useState([]);
    const [currentHand, _setCurrentHand] = useState(playersTiles);


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

    async function setCurrentHand(tiles) {
        _setCurrentHand(tiles);
    }

    useEffect(() => {
        makeFakeBoard();
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GameContext.Provider value={{
            errormessage,
            setErrorMessage,
            currentTile,
            setCurrentTile,
            currentMove,
            setCurrentMove,
            addToCurrentMove,
            currentBoard,
            setCurrentBoard,
            currentHand,
            setCurrentHand,
        }}
        >
            {children}
        </GameContext.Provider>
    );
}