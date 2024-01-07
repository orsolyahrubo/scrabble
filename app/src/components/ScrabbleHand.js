import './ScrabbleTitle.scss'
import { useEffect, useState } from "react";
import ScrabbleTitle from './ScrabbleTitle'


export default function ScrabbleHand({ arrOfPlayersCurrentLetters }) {

    const [arrOfLetters, setArrOfLetters] = useState([]);

    useEffect(() => {
        setArrOfLetters(arrOfPlayersCurrentLetters)
    }, [arrOfPlayersCurrentLetters])

    // I might want to use context for this and useEffect if this changes than it can rerender should I?

    return (
        <div className='container border border-warning p-0 text-center'>
            {arrOfLetters.length > 0 ? (
                <>
                    {arrOfLetters.map((tile) => (
                        <ScrabbleTitle value={tile.value} score={tile.score} />
                    ))}
                </>
            ) : (
                <p>There are no letters in your hand.</p>
            )
            }
        </div>

    )
}