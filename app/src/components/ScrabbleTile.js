import './ScrabbleTile.scss'

export default function ScrabbleTile({ value, score }) {

    return (
        <>
            {value && score ? (
                <div className="tile btn btn-secondary d-inline-flex m-1">
                    <p className="px-1 mr-0 w-100 fs-4">{value}</p>
                    <p className="pt-4 pb-0 m-0 flex-shrink-1">{score}</p>
                </div>
            ) : (
                <div className="emptyTile btn btn-secondary d-inline-flex m-1">
                    <p className="px-1 mr-0 w-100 fs-4">{' '}</p>
                    <p className="pt-4 pb-0 m-0 flex-shrink-1">{' '}</p>
                </div>
            )}
        </>
        
    )
}