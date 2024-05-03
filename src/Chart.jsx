import { useEffect, useState } from 'react';
import defaultImg from './assets/default.png'
import { useSpring, useTransition, animated } from "react-spring";

function Chart(props) 
{
    const [card, setCard] = useState({
        type : 'img',
        src : defaultImg,
        alt : 'cover'
    });
    const [isClicked, setIsClicked] = useState(false);

    const [row, setRow] = useState([card]);
    const [listOfRows, addRow] = useState([row]);

    // UPDATE COLUMNS
    useEffect(() => {
        if (props.colsNum < Object.keys(row).length) {
            setRow(row.filter((_, i) => i < props.colsNum));
        } else {
            for (let i = Object.keys(row).length; i < props.colsNum; i++) {
                setRow(r => [...r, card]);
            }
        }
        console.log(props.image);
    }, [props.colsNum, row]); // Only add new column of cards if colsNum is changed

    // UPDATE ROWS
    useEffect(() => {
        if (props.rowsNum < Object.keys(listOfRows).length) {
            addRow(listOfRows.filter((_, ri) => ri < props.rowsNum));
        } else {
            for (let i = listOfRows.length; i < props.rowsNum; i++) {
                addRow(rs => [...rs, row]);
            }
        }
    }, [props.rowsNum, row]); // Only add new row if rowsNum is changed

    function handleClick(event) {
        event.target['src']=props.image;
    }
    /*
    const [styles, api] = useSpring(() => ({
        border: "1px solid black"
    }));

    useEffect(() => {
        api.start({
            border: isClicked ? "1px solid black" : "2px solid white"
        });
        setIsClicked((prev) => !prev);
    }, []);
    */
    const updatedRow = row.map((r, index)=>{
        return(
            <div className='card'>
                <img key={index} src={row[index].src} alt={row[index].alt} onClick={handleClick}
                    
                />
            </div>
        );
    });

    const totalRows = listOfRows.map((r, index) => {
        return(
            <div className='chartRow' key={index}>
                {updatedRow}
            </div>
        );
    });

    return(
        <div id="chartWrapper">
            {totalRows}
        </div>
    )
}

export default Chart