import { useEffect, useState } from 'react';
import './App.css';
import Chart from './Chart.jsx';
import defaultImg from './assets/default.png'

function App() {
	const [backendData, setBackendData] = useState({});

	useEffect(() => {
		fetch("http://localhost:5000/api").then(
			response => response.json()
		).then(
			data => {setBackendData(data)}
		)
	}, []) // Only runs on the first render of the component

	const [rowCount, setRowCount] = useState(3);
    const [colCount, setColCount] = useState(3);
	const [search, submitSearch] = useState("");
	
	const [newDet, setNewDet] = useState({
										artist : '',
										album: '', 
										coverArt : ''});
	const [searchContents, updateContents] = useState([newDet]);
	
	const [coverList, setCoverList] = useState(['']);
	const [artistList, setArtistList] = useState(['']);
	const [albumList, setAlbumList] = useState(['']);

	const defImg = defaultImg;

	const [imgSrc, setImgSrc] = useState(defImg);
	const [artistName, setArtist] = useState('');
	const [albumName, setAlbum] = useState('');

	function updateRowCount(event) {
        setRowCount(event.target.value);
    }

    function updateColCount(event) {
        setColCount(event.target.value);
    }
	
	function handleSubmit(event) {
		submitSearch(event.target.value);
		fetchLastFmData();
	}
	
	function handleClickImage(event) { 
		const i = (event.target['alt']);
		setAlbum(albumList[i]);
		setArtist(artistList[i]);
		setImgSrc(coverList[i]);
	}
	
	async function fetchLastFmData() {
		setCoverList([]); // Clear previous search results
		setArtistList([]);
		setAlbumList([]);

		try {
			const res = await fetch('https://ws.audioscrobbler.com/2.0/?method=album.search&album='+search+'&api_key='+backendData["API_KEY"]+'&format=json');
			const data = await res.json();

			if (data.results && data.results.albummatches && data.results.albummatches.album) {
				const albumList = data.results.albummatches.album;
				albumList.forEach((a) =>
					setCoverList(alb => [...alb,(a.image[3]['#text'])])
				);
				albumList.forEach((a) =>
					setArtistList(alb => [...alb,(a.artist)])
				);
				albumList.forEach((a) =>
					setAlbumList(alb => [...alb,(a.name)])
				);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	const listOfResults = coverList.map((result, index) => {	
        return(
			<div className='searchCard' key={`search-result-${index}`}>
            	<img 
					src={result} 
					onClick={handleClickImage} 
					alt={index}
				/>
			</div>
        );
    });

	return(
	<>
		<div id="fixed">
			<div id='sliderWrapper'>
				<div>
					<label>Rows:
						<input id="slider" type="range" min={1} max={10}
							value={rowCount}
							onChange={updateRowCount}
						/>
						<span>{rowCount}</span>
					</label>
				</div>

				<div>
					<label>Columns:
						<input id="slider" type="range" min={1} max={10}
							value={colCount}
							onChange={updateColCount}
						/>
						<span>{colCount}</span>
					</label>
				</div>
			</div>
			<div id="searchWrapper">
                <select id="selectType">
                    <option value="music">Music</option>
                    <option value="movies">Movies</option>
                    <option value="books">Books</option>
                </select>
                <input 
					name='search-music'
					type='text'
					placeholder='Search for album or artist'
					value={search}
					onChange={(event) => submitSearch(event.target.value)}
				/>
				<button onClick={handleSubmit}>Search</button>
				<div id='searchResults'>
					{listOfResults}
				</div>
			</div>
		</div>
		<Chart rowsNum={rowCount} colsNum={colCount} image={imgSrc} artist={artistName} album={albumName}/>
	</>
	)
}

export default App