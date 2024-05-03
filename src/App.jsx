import { useEffect, useState } from 'react'
import './App.css'
import Chart from './Chart.jsx'

function App() {
	const [rowCount, setRowCount] = useState(3);
    const [colCount, setColCount] = useState(3);
	const [search, submitSearch] = useState("");

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
	
	async function fetchLastFmData() {
		const res = await fetch('https://ws.audioscrobbler.com/2.0/?method=album.search&album='+search+'&api_key=c1cdfe36b37e79fa24ca83d862a9dcaf&format=json');
		const data = await res.json();
		console.log(data);
	}
	

	return(
	<>
		<div id="fixed">
			<div id='sliderWrapper'>
				<div>
					<label>Rows:
						<input id="rowSlider" type="range" min={1} max={10}
							value={rowCount}
							onChange={updateRowCount}
						/>
						<span>{rowCount}</span>
					</label>
				</div>

				<div>
					<label>Columns:
						<input id="colSlider" type="range" min={1} max={10}
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
                    <option value="music">Movies</option>
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
			</div>
		</div>
		<Chart rowsNum={rowCount} colsNum={colCount}/>
	</>
	)
}

export default App
