import ScrabbleTile from './ScrabbleTile'

export default function ScrabbleHand({ arrOfPlayersCurrentLetters }) {

    return (
        <>
            <div className='container border border-warning p-0 text-center'>
                {arrOfPlayersCurrentLetters.length > 0 ? (
                    <>
                        {arrOfPlayersCurrentLetters.map((tile) => (
                            <ScrabbleTile value={tile.value} score={tile.score} />
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