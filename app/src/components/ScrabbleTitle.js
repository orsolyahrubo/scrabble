import { useEffect, useState } from "react";
import './ScrabbleTitle.scss'

export default function ScrabbleTitle() {
    const [letter, setLetter] = useState(null);
    const [value, setValue] = useState(0);

    useEffect(() => {
        setLetter('A');
        setValue('1');
    }, [])

    // useEffect(() => {
    //     setLetter(props.letter);
    //     setValue(props.value);
    // })

    return (
        <div className="tile btn btn-secondary d-inline-flex">
            <p className="px-1 mr-0 w-100 fs-4">{letter}</p>
            <p className="pt-4 pb-0 m-0 flex-shrink-1">{value}</p>
        </div>
    )
}