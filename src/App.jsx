import { useState, useEffect } from 'react'
import './App.css'
import * as trackService from './services/trackService.js'
import Tracklist from './components/Tracklist/Tracklist.jsx';

function App() {
    const [tracks, setTracks] = useState([]);
    const [nowPlaying, setNowPlaying] = useState();
    const [selected, setSelected] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("@App | RUN useEffect")
            try {
                const data = await trackService.index();
                console.log("@App | Data: ", data)
                setTracks(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    },[])

    const handleDelete =  async (id) => {
        console.log("@handleDelete", id);
        try {
            const deletedTrack = await trackService.deleteTrack(id);
            if (!deletedTrack) throw new Error("Delete Track Failed! Please try again later.");
            setTracks(tracks.filter(track => track._id !== id));
        } catch (err) {
            console.error(err)
        }
    };
    const handleEdit = (id) => {
        console.log("@handleEdit", id);
        setSelected(tracks.find(track => track._id===id));
        setShowEditModal(true);
    }
    const handleUpdate = async (track) => {
        console.log("@handleUpdate", id);
        try {
            const updatedTrack = await trackService.update(track, {new:true});
            if (!updatedTrack) throw new Error("Update Track Failed! Please try again later.");
            setSelected(updatedTrack);
            setShowEditModal(false);
            set
        } catch (err) {
            console.error(err);
        }
    };

	return (
		<main>
			<h1>Jukebox lite</h1>
            <Tracklist tracks={tracks} crud={{handleDelete, handleEdit}} />
            {/* mode==='nowPlaying' && <NowPlaying track={nowPlaying} /> */}
            {/* showEditModal && <EditModal track={selected} handleUpdate={handleUpdate} /> */}
		</main>
	)
}

export default App