import { useState, useEffect } from 'react'
import './App.css'
import Chart from './Chart.jsx'

function App() {
	const [rowCount, setRowCount] = useState(3);
    const [colCount, setColCount] = useState(3);

	function updateRowCount(event) {
        setRowCount(event.target.value);
    }

    function updateColCount(event) {
        setColCount(event.target.value);
    }

	useEffect(() => {
		console.log("Rows: " + rowCount + " Cols: "  + colCount);
	});

	return(
	<>
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

		<Chart rowsNum={rowCount} colsNum={colCount}/>
	</>
	)
}

export default App
