// import { useEffect, useState } from "react";
import './ScrabbleTitle.scss'

export default function ScrabbleTitle({ value, score }) {
    // I might want to use states for this but not sure if that makes sense here, because these props are not supposed to change
    // const [letter, setLetter] = useState(null);
    // const [number, setNumber] = useState(0);

    // useEffect(() => {
    //     setLetter(value);
    //     setNumber(score);
    // }, [])

    return (
        <div className="tile btn btn-secondary d-inline-flex m-1">
            <p className="px-1 mr-0 w-100 fs-4">{value}</p>
            <p className="pt-4 pb-0 m-0 flex-shrink-1">{score}</p>
        </div>
    )
}