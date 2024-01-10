import './ScrabbleBoard.scss'
import ScrabbleTile from './ScrabbleTile'

export default function ScrabbleBoard({currentBoard}) {
    
    return (
        <div className='board container-xl border d-flex flex-wrap text-center'>
            {currentBoard.map((row) => (
                row.map((element, index) => (
                    <ScrabbleTile key={index} value={element?.value} score={element?.score} />
                ))
            ))}
        </div>
    )
}