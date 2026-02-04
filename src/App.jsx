import { useState, useEffect } from 'react'
import './App.css'
import * as trackService from './services/trackService.js'
import Tracklist from './components/Tracklist/Tracklist.jsx';
import NowPlaying from './components/NowPlaying/NowPlaying.jsx';

function App() {
    const [tracks, setTracks] = useState([]);
    const initNowPlaying = {title:'', artist:'', duration:'0:00', albumArt:''};
    const [nowPlaying, setNowPlaying] = useState(initNowPlaying);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selected, setSelected] = useState();
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("@App | RUN useEffect")
            try {
                const data = await trackService.index();
                console.log("@App | Data: ", data)
                setTracks(data);
                if (data.length > 0) {
                    handleSelectSong(data[0]);
                    setIsPlaying(false);
                };
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
    const handleEdit = (track) => {
        console.log("@handleEdit", track);
        setSelected(track);
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
    const handleSelectSong = (track) => {
        setNowPlaying({
            ...track,
            duration:track?.duration || '0:00',
            albumArt:track?.albumArt || ''
        });
        setIsPlaying(true);
    };

	return (
		<main>
			<h1>Jukebox lite</h1>
            <Tracklist tracks={tracks} crud={{handleDelete, handleEdit}} handleSelectSong={handleSelectSong} nowPlaying={nowPlaying} />
            <NowPlaying track={nowPlaying} isPlaying={isPlaying} setIsPlaying={setIsPlaying} crud={{handleDelete, handleEdit}} />
            {/* showEditModal && <EditModal track={selected} handleUpdate={handleUpdate} /> */}
		</main>
	)
}

export default App