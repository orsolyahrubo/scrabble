import './ScrabbleBoard.scss'
import ScrabbleTile from './ScrabbleTile'

export default function ScrabbleBoard() {

    const currentBoard = Array(15).fill(Array(15).fill(null))
    
    return (
        <div className='board container border d-flex flex-wrap text-center'>
            {currentBoard.map((row) => (
                row.map((element) => (
                    <ScrabbleTile value={element?.value} score={element?.score} />
                ))
            ))}
        </div>
    )
}