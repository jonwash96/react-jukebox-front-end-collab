import { useState, useEffect } from "react";
import "./App.css";
import * as trackService from "./services/trackService.js";
import Tracklist from "./components/Tracklist/Tracklist.jsx";
import NowPlaying from "./components/NowPlaying/NowPlaying.jsx";
import TrackForm from "./components/TrackForm/TrackForm.jsx";

function App() {
  const [tracks, setTracks] = useState([]);
  const initNowPlaying = {
    title: "",
    artist: "",
    duration: "0:00",
    albumArt: "",
  };
  const [nowPlaying, setNowPlaying] = useState(initNowPlaying);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await trackService.index();
        setTracks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletedTrack = await trackService.deleteTrack(id);
      if (!deletedTrack)
        throw new Error("Delete Track Failed! Please try again later.");
      setTracks(tracks.filter((track) => track._id !== id));

      if (nowPlaying?._id === id) {
        setNowPlaying(initNowPlaying);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (track) => {
    setSelected(track);
    setShowEditModal(true);
  };

  useEffect(() => {
    if (showEditModal) document.getElementById("track-form-modal").showModal()
    else document.getElementById("track-form-modal").close();
  }, [showEditModal])

  const showCreateForm = () => setShowEditModal(true);

  const handleCreate = async (trackData) => {
    try {
      const createdTrack = await trackService.create(trackData);
      if (!createdTrack) { throw new Error("Create Track Failed! Please try again.") };

      setTracks((prev) => [...prev, createdTrack]);

      setSelected(null);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (track) => {
    try {
      const updatedTrack = await trackService.update(track);
      if (!updatedTrack)
        throw new Error("Update Track Failed! Please try again later.");

      setTracks((prev) =>
        prev.map((t) => (t._id === updatedTrack._id ? updatedTrack : t)),
      );

      if (nowPlaying?._id === updatedTrack._id) {
        handleSelectSong(updatedTrack);
      }

      setSelected(null);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectSong = (track) => {
    setNowPlaying({
      ...track,
      duration: track?.duration || "0:00",
      albumArt: track?.albumArt || "",
    });
    setIsPlaying(true);
  };

  return (
    <main>
      <h1>Jukebox lite</h1>
      <button type="button" id="create-button" onClick={showCreateForm}>➕</button>
      <Tracklist
        tracks={tracks}
        crud={{ handleDelete, handleEdit }}
        handleSelectSong={handleSelectSong}
        nowPlaying={nowPlaying}
      />

      {nowPlaying.title && (
        <NowPlaying
          track={nowPlaying}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          crud={{ handleDelete, handleEdit }}
        />
      )}

      <TrackForm
        key={selected?._id ?? "create-track"}
        selected={selected}
        setSelected={setSelected}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        closeForm={() => setShowEditModal(false)}
      />
    </main>
  );
}

export default App;
