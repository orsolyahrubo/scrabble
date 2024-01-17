import './ScrabbleBoard.scss'
import ScrabbleTile from './ScrabbleTile'
import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { HandContext } from '../contexts/HandContext';

export default function ScrabbleBoard({ currentBoard }) {

    const { currentTile, addToCurrentMove, currentMove, setCurrentTile, setCurrentBoard } = useContext(GameContext);
    const { currentHand, setCurrentHand } = useContext(HandContext);

    async function onTileClick(value, score, id, rowIndex, columnIndex) {
        if (!value && !score && !id && currentTile) {
            addToCurrentMove({ x: rowIndex, y: columnIndex, tile: currentTile });
            setCurrentHand(currentHand.filter(tile => tile.id !== currentTile.id));
            const newBoard = currentBoard.map((row, index) => {
                return row.map((element, index2) => {
                    if (index === rowIndex && index2 === columnIndex) {
                        return currentTile;
                    }
                    return element;
                });
            }
            )
            setCurrentBoard(newBoard);
            setCurrentTile(null);
        }
        if (value && score && id && !currentTile) {
            if (currentMove.some(tile => tile.x === rowIndex && tile.y === columnIndex)) {
                setCurrentHand([...currentHand, { value, score, id }]);
                const newBoard = currentBoard.map((row, index) => {
                    return row.map((element, index2) => {
                        if (index === rowIndex && index2 === columnIndex) {
                            return null;
                        }
                        return element;
                    });
                }
                )
                setCurrentBoard(newBoard);
            }
        }
    }

    return (
        <div className='board container-xl border d-flex flex-wrap text-center'>
            {currentBoard.map((row, rowIndex) => (
                row.map((element, columnIndex) => (
                    <ScrabbleTile
                        key={columnIndex}
                        id={element?.id}
                        value={element?.value}
                        score={element?.score}
                        onClick={() => onTileClick(element?.value, element?.score, element?.id, rowIndex, columnIndex)}
                        extraClasses={
                            currentMove.some(tile => tile.x === rowIndex && tile.y === columnIndex) ? 'stillInHand' : ''}
                    />
                ))
            ))}
        </div>
    )
}