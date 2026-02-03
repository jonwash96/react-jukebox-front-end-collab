import { useState, useEffect } from 'react'
import './App.css'
import * as trackService from './services/trackService.js'

function App() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("@App | RUN useEffect")
            try {
                const data = await trackService.showOne("6981358a91d23e8ab9c008e8");
                console.log(" Data: ", data)
                setTracks([...tracks, data])
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    },[])


	return (
		<>
			<h1>Basic MVP</h1>
            <p>If the front end can talk to the back end and a valid trak id is placed in the showOne function call; Then the following fields should display on the page.</p>
            <h4>Name: {tracks[0]?.title}</h4>
            <p>Artist: {tracks[0]?.artist}</p>
		</>
	)
}

export default App