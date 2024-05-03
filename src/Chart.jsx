import { useEffect, useState, useRef } from 'react';
import cover from './assets/default.png'

function Chart(props) 
{
    const imgUrl = cover;
    const card = {
        type : 'img',
        src : imgUrl,
        alt : 'cover'
    }

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

    const updatedRow = row.map((r, index)=>{
        return(
            <img className='card' key={index} src={row[index].src} alt={row[index].alt}
                
            />
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