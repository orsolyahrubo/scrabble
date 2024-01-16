import ScrabbleTile from './ScrabbleTile'
import { v1 as uuidv1 } from 'uuid';
import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

export default function ScrabbleHand({ arrOfPlayersCurrentLetters }) {

    const { setCurrentTile } = useContext(GameContext);

    return (
        <>
            <div className='container border border-warning p-0 text-center'>
                {arrOfPlayersCurrentLetters.length > 0 ? (
                    <>
                        {arrOfPlayersCurrentLetters.map((tile, index) => (
                            <ScrabbleTile
                                id={uuidv1()}
                                key={index}
                                value={tile.value}
                                score={tile.score}
                                setCurrentTile={() => setCurrentTile(tile.value, tile.score)} />
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