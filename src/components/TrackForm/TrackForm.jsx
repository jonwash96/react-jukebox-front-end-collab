import { useState, useEffect } from "react";

export default function TrackForm({
  selected, // track to edit or null
  setSelected, // allows us to exit edit mode
  handleCreate, // function from App.jsx for creating
  handleUpdate, // function from App.jsx for updating
}) {
  // this holds the values of our inputs (controlled form)
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
  });

  // this runs whenever "selected" changes
  // if selected has a track -> prefill inputs (edit mode)
  // if selected is null -> clear inputs (create mode)
  useEffect(() => {
    if (selected) {
      setFormData({
        title: selected.title || "",
        artist: selected.artist || "",
        _id: selected._id, // important for update
      });
    } else {
      setFormData({
        title: "",
        artist: "",
      });
    }
  }, [selected]);

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
}
