import { useState } from "react";
import * as trackService from '../../services/trackService'

export default function TrackForm({tracks}) {
  // hold all the values from the form inputs
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
  });

  // update formData
  // runs everytime the user types in an input
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // runs when form is submitted
  async function handleSubmit(e) {
    e.preventDefault(); // stops page from refreshing

    try {
      // send formData to the backend using the service file
      const createdTrack = await trackService.create({ ...formData });

      console.log("Track successfully created:", createdTrack);

      // after submit clear the form for next the entry
      setFormData({
        title: "",
        artist: "",
      });
    } catch (error) {
      console.log("Error creating track:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Track</h2>

      {/* title input */}
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      {/* artist input */}
      <label>Artist</label>
      <input
        type="text"
        name="artist"
        value={formData.artist}
        onChange={handleChange}
        required
      />

      <button type="submit">Create Track</button>
    </form>
  );
};
