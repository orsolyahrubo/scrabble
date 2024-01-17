import './ScrabbleBoard.scss'
import ScrabbleTile from './ScrabbleTile'
import { useContext, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';

export default function ScrabbleBoard({ currentBoard }) {

    const { currentTile, addToCurrentMove, currentMove, setCurrentTile } = useContext(GameContext);

    async function onTileClick(value, score, id, rowIndex, columnIndex) {
        if (!value && !score && !id && currentTile) {
            addToCurrentMove({ x: rowIndex, y: columnIndex, tile: currentTile });
            setCurrentTile(null);
        }
    }
    console.log('currentTile is', currentTile);
    console.log('currentMove is', currentMove);

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
                    />
                ))
            ))}
        </div>
    )
}