import ScrabbleTile from './ScrabbleTile'
import './ScrabbleHand.scss'
import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

export default function ScrabbleHand({ tiles }) {

    const { setCurrentTile, currentTile } = useContext(GameContext);

    async function onTileClick(value, score, id) {
        if (!currentTile || currentTile.id !== id) {
            setCurrentTile({ value, score, id });
        } else if (currentTile.id === id) {
            setCurrentTile(null);
        }
    }

    return (
        <>
            <div className='container border border-warning p-0 text-center'>
                {tiles.length > 0 ? (
                    <>
                        {tiles.map((tile) => (
                            <ScrabbleTile
                                id={tile.id}
                                key={tile.id}
                                extraClasses={currentTile?.id === tile.id ? 'selected' : ''}
                                value={tile.value}
                                score={tile.score}
                                onClick={() => onTileClick(tile.value, tile.score, tile.id)} />
                        ))}
                    </>
                ) : (
                    <p>There are no letters in your hand.</p>
                )
                }
            </div>
            <div className='d-flex justify-content-center'>
                <button className='d-md-block btn btn-outline-warning'>Put down</button>
            </div>
        </>


    )
}