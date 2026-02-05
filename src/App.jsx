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
      console.log("@App | RUN useEffect");
      try {
        const data = await trackService.index();
        // console.log("@App | Data: ", data)
        setTracks(data);
        if (data.length > 0) {
          handleSelectSong(data[0]);
          setIsPlaying(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Delete a track
  const handleDelete = async (id) => {
    console.log("@handleDelete", id);
    try {
      const deletedTrack = await trackService.deleteTrack(id);
      if (!deletedTrack)
        throw new Error("Delete Track Failed! Please try again later.");
      setTracks(tracks.filter((track) => track._id !== id));

      // if we delete the one playing, reset nowPlaying
      if (nowPlaying?._id === id) {
        setNowPlaying(initNowPlaying);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * When edit is clicked in Tracklist:
   * - store track in selected
   * - show TrackForm
   */
  const handleEdit = (track) => {
    // console.log("@handleEdit", track);
    setSelected(track);
    setShowEditModal(true);
  };

  /**
   * Create a new track:
   * - call API via trackservice.create
   * - update local state so it appears immediately
   * - close form
   */
  const handleCreate = async (trackData) => {
    try {
      const createdTrack = await trackService.create(trackData);
      if (!createdTrack)
        throw new Error("Create Track Failed! Please try again.");

      setTracks((prev) => [...prev, createdTrack]);

      // close form
      setSelected(null);
      setShowEditModal(false);
    } catch (error) {
      console.error(err);
    }
  };

  /**
   * Update existing track:
   * - call API via trackService.update
   * - replace updated track in local state
   * - close form
   */
  const handleUpdate = async (track) => {
    // console.log("@handleUpdate", id);
    try {
      const updatedTrack = await trackService.update(track);
      if (!updatedTrack)
        throw new Error("Update Track Failed! Please try again later.");

      // replace the old track with the updated one in state
      setTracks((prev) =>
        prev.map((t) => (t._id === updatedTrack._id ? updatedTrack : t)),
      );

      // keep nowPlaying synced if you edited the track currently playing
      if (nowPlaying?._id === updatedTrack._id) {
        handleSelectSong(updatedTrack);
      }

      // close form
      setSelected(null);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // track "play" selection
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

      {/* Main UI shown when form is not visible */}
      {!showEditModal && (
        <Tracklist
          tracks={tracks}
          crud={{ handleDelete, handleEdit }}
          handleSelectSong={handleSelectSong}
          nowPlaying={nowPlaying}
        />
      )}

      {!showEditModal && (
        <NowPlaying
          track={nowPlaying}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          crud={{ handleDelete, handleEdit }}
        />
      )}

      {/* Form shown when showEditModal is true */}
      {showEditModal && (
        <TrackForm
          track={selected}
          setSelected={setSelected}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          closeForm={() => setShowEditModal(false)}
        />
      )}
    </main>
  );
}

export default App;
