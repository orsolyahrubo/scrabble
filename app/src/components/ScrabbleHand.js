import ScrabbleTile from './ScrabbleTile'
import './ScrabbleHand.scss'
import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

export default function ScrabbleHand({ arrOfPlayersCurrentLetters }) {

    const { _setCurrentTile, currentTile } = useContext(GameContext);

    async function setCurrentTile(value, score, id) {
        if (!currentTile || currentTile.id !== id) {
            _setCurrentTile({ value, score, id });
        } else if (currentTile.id === id) {
            _setCurrentTile(null);
        }
    }

    return (
        <>
            <div className='container border border-warning p-0 text-center'>
                {arrOfPlayersCurrentLetters.length > 0 ? (
                    <>
                        {arrOfPlayersCurrentLetters.map((tile) => (
                            <ScrabbleTile
                                id={tile.id}
                                key={tile.id}
                                classNameForSelecting={currentTile?.id === tile.id ? 'selected' : ''}
                                value={tile.value}
                                score={tile.score}
                                setCurrentTile={() => setCurrentTile(tile.value, tile.score, tile.id)} />
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