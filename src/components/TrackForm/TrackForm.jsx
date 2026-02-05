import { useState, useEffect } from "react";

export default function TrackForm({
  selected, // track to edit or null
  setSelected, // function to clear selection (exit edit mode)
  handleCreate, // function from App.jsx for creating
  handleUpdate, // function from App.jsx for updating
  closeForm, // optional: callback to hide the form
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
        title: selected.title ?? "",
        artist: selected.artist ?? "",
        _id: selected._id, // important for update
      });
    } else {
      setFormData({
        title: "",
        artist: "",
      });
    }
  }, [selected]);

  // updates state as user types
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  /**
   * Submit:
   * - if selected exists -> update
   * - else -> create
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (selected) {
      await handleUpdate(formData);
      setSelected(null); // exit edit mode
    } else {
      await handleCreate(formData);
    }

    // reset inputs after submit
    setFormData({ title: "", artist: "" });

    // Hide the form if App.jsx passed close function
    if (closeForm) closeForm();
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
}
