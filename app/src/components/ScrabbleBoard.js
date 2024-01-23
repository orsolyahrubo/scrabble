import './ScrabbleBoard.scss'
import ScrabbleTile from './ScrabbleTile'
import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

export default function ScrabbleBoard() {

    const { currentTile,
        currentMove,
        currentHand,
        currentBoard,
        setCurrentTile,
        setCurrentHand,
        setCurrentMove,
        addToCurrentMove, } = useContext(GameContext);

    async function onTileClick(value, score, id, rowIndex, columnIndex) {
        const isTaken = value && score && id;
        if (!isTaken && currentTile) {
            addToCurrentMove({ x: rowIndex, y: columnIndex, tile: currentTile });
            setCurrentHand(currentHand.filter(tile => tile.id !== currentTile.id));
            setCurrentTile(null);
        }
        if (isTaken && !currentTile) {
            if (currentMove.some(tile => tile.x === rowIndex && tile.y === columnIndex)) {
                setCurrentMove(currentMove.filter(tile => !(tile.x === rowIndex && tile.y === columnIndex)));
                setCurrentHand([...currentHand, { value, score, id }]);
            }
        }
    }

    const board = currentBoard.map((row, index) => (
        row.map((element, columnIndex) => (
            {
                ...element,
                extraClasses: ""
            }
        )
        )
    ));

    for (const tile of currentMove) {
        board[tile.x][tile.y] = {
            ...tile.tile,
            extraClasses: "stillInHand"
        }
    }

    return (
        <div className='board container-xl border d-flex flex-wrap text-center'>
            {board.map((row, rowIndex) => (
                row.map((element, columnIndex) => (
                    <ScrabbleTile
                        key={`${rowIndex}-${columnIndex}`}
                        id={element?.id}
                        value={element?.value}
                        score={element?.score}
                        onClick={() => onTileClick(element?.value, element?.score, element?.id, rowIndex, columnIndex)}
                        extraClasses={element?.extraClasses}
                    />
                ))
            ))}
        </div>
    )
}