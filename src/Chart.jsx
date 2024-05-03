import { createElement, useEffect, useState } from 'react';
import cover from './assets/either-or.jpg'

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

    useEffect(() => {
        if (props.colsNum < Object.keys(row).length) {
            setRow(row.filter((_, i) => i < props.colsNum));
        } else {
            setRow(r => [...r, card]);
        }
    }, [props.colsNum]); // Only add new column of cards if colsNum is changed

    useEffect(() => {
        if (props.rowsNum < Object.keys(listOfRows).length) {
            addRow(listOfRows.filter((_, ri) => ri < props.rowsNum));
        } else {
            addRow(rs => [...rs, row]);
        }
    }, [props.rowsNum]); // Only add new row if rowsNum is changed

    const updatedRow = row.map((r, index)=>{
        return(
            <img key={index} src={row[index].src} alt={row[index].alt}
                
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