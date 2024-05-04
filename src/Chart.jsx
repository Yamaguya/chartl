import { useEffect, useState } from 'react';
import defaultImg from './assets/default.png'

function Chart(props) 
{
    const defaultAlt = 'coverArt'
    const [card, setCard] = useState({
        type : 'img',
        src : defaultImg,
        alt : defaultAlt
    });
    const [row, setRow] = useState([card]);
    const [listOfRows, addRow] = useState([row]);
    const [chartInfo, addInfo] = useState([]);

    // ---UPDATE COLUMNS---
    useEffect(() => {
        if (props.colsNum < Object.keys(row).length) {
            setRow(row.filter((_, i) => i < props.colsNum));
        } else {
            for (let i = Object.keys(row).length; i < props.colsNum; i++) {
                setRow(r => [...r, card]);
            }
        }
    }, [props.colsNum, row]); // Only add new column of cards if colsNum is changed

    // ---UPDATE ROWS---
    useEffect(() => {
        if (props.rowsNum < Object.keys(listOfRows).length) {
            addRow(listOfRows.filter((_, ri) => ri < props.rowsNum));
        } else {
            for (let i = listOfRows.length; i < props.rowsNum; i++) {
                addRow(rs => [...rs, row]);
            }
        }
    }, [props.rowsNum, row]); // Only add new row if rowsNum is changed

    // ---PLACE ON CHART---
    function handleClick(event) {
        console.log('props.album : ' + props.album + '\n' + 'chartInfo: ' + chartInfo);

        // If there is an image in the selected position, remove it and replace it with
        // the new one
        if (chartInfo.indexOf(event.target['alt']) > -1) 
        {
            console.log("There is already an image there.");
        }

        // If the image is already in the chart, remove it from its position and place 
        // it in the selected position
        else if (chartInfo.indexOf(props.album) > -1) 
        {
            console.log("The image is already in the chart.");
            //chartInfo[chartInfo.indexOf(props.album)] = "";
            //event.target['src']=props.image;
            //event.target['alt']=props.album;
        }

        // If there is no image there and the selected image isn't already in the chart 
        // then place it and add its details to the chart in the correct ranking
        else
        {
            event.target['src']=props.image;
            event.target['alt']=props.album;
            addInfo(cinf => [...cinf, props.album]);
        }

    }

    const updatedRow = row.map((r, colIndex)=>{
        return(
            <div className='card'>
                <img key={colIndex} src={row[colIndex].src} alt={row[colIndex].alt} onClick={handleClick}
                    
                />
            </div>
        );
    });

    const totalRows = listOfRows.map((r, rowIndex) => {
        return(
            <div className='chartRow' key={rowIndex}>
                {updatedRow}
            </div>
        );
    });

    return(
        <div id="chartWrapper">
            <div id='chart'>{totalRows}</div>
            <div id='chartDetails'>
                <ul>
                    {chartInfo.map((d, index) => (<li key={index}>{d}</li>))}
                </ul>
            </div>
        </div>
    )
}

export default Chart