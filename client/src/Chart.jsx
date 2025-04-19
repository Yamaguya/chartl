import { useEffect, useState } from 'react';
import defaultImg from './assets/default.png'

function Chart(props) 
{
    const defaultAlt = 'coverArt'
    // Store album positions in a grid-independent data structure
    // Use a Map with position keys like "0-1" (row 0, col 1)
    const [albumPositions, setAlbumPositions] = useState(new Map());
    const [gridMatrix, setGridMatrix] = useState([]);
    
    // Update the grid when rows or columns change, but preserve albums
    useEffect(() => {
        const newGrid = [];
        
        // Create the new grid structure
        for (let i = 0; i < props.rowsNum; i++) {
            const row = [];
            for (let j = 0; j < props.colsNum; j++) {
                const position = `${i}-${j}`;
                // Check if this position had an album
                if (albumPositions.has(position)) {
                    // Use the existing album data
                    row.push({
                        ...albumPositions.get(position),
                        id: position
                    });
                } else {
                    // Create an empty cell
                    row.push({
                        type: 'img',
                        src: defaultImg,
                        alt: defaultAlt,
                        id: position
                    });
                }
            }
            newGrid.push(row);
        }
        
        setGridMatrix(newGrid);
    }, [props.rowsNum, props.colsNum, albumPositions]);
    
    // Get ordered album list for the sidebar
    const getOrderedAlbumList = () => {
        const albums = [];
        
        // Go through grid from top to bottom, left to right
        for (let i = 0; i < props.rowsNum; i++) {
            for (let j = 0; j < props.colsNum; j++) {
                const position = `${i}-${j}`;
                
                if (albumPositions.has(position)) {
                    const albumData = albumPositions.get(position);
                    if (albumData.alt !== defaultAlt) {
                        albums.push({
                            album: albumData.alt,
                            artist: albumData.artist,
                            position: position // Keep track of position for debugging
                        });
                    }
                }
            }
        }
        
        return albums;
    };
    
    // Handle click on a chart position
    function handleClick(rowIndex, colIndex) {
        if (!props.album) return;
        
        const position = `${rowIndex}-${colIndex}`;
        const newPositions = new Map(albumPositions);
        
        // Check if this position already has the same album
        if (newPositions.has(position) && newPositions.get(position).alt === props.album) {
            return; // Nothing to do if it's the same album
        }
        
        // Check if the album is already in the chart elsewhere
        let existingPosition = null;
        newPositions.forEach((value, key) => {
            if (value.alt === props.album) {
                existingPosition = key;
            }
        });
        
        // If it's elsewhere, remove it from that position
        if (existingPosition) {
            newPositions.delete(existingPosition);
        }
        
        // Add album to the clicked position
        newPositions.set(position, {
            type: 'img',
            src: props.image,
            alt: props.album,
            artist: props.artist
        });
        
        setAlbumPositions(newPositions);
    }

    const orderedAlbums = getOrderedAlbumList();

    return(
        <div id="chartWrapper">
            <div id='chart'>
                {gridMatrix.map((row, rowIndex) => (
                    <div className='chartRow' key={`row-${rowIndex}`}>
                        {row.map((cell, colIndex) => (
                            <div className='card' key={`cell-${rowIndex}-${colIndex}`}>
                                <img 
                                    src={cell.src} 
                                    alt={cell.alt} 
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div id='chartDetails'>
                <ul>
                    {orderedAlbums.map((item, index) => (
                        <li key={`info-${index}`}>
                            {index + 1}. {item.album} - {item.artist}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Chart