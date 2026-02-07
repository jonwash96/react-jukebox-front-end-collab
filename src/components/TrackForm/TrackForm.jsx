import { useState } from "react";

export default function TrackForm({
  selected, // track to edit or null
  setSelected, // function to clear selection (exit edit mode)
  handleCreate, // function from App.jsx for creating
  handleUpdate, // function from App.jsx for updating
  closeForm, // optional: callback to hide the form
}) {
  const buildFormData = (track) => ({
    title: track?.title ?? "",
    artist: track?.artist ?? "",
  });

  // this holds the values of our inputs (controlled form)
  const [formData, setFormData] = useState(() => buildFormData(selected));

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
      await handleUpdate({ ...formData, _id: selected._id });
      setSelected(null); // exit edit mode
    } else {
      await handleCreate(formData);
    }

    // reset inputs after submit
    setFormData(buildFormData());

    // Hide the form if App.jsx passed close function
    if (closeForm) closeForm();
  }

  // cancel should exit edit mode and close the form
  function handleCancel() {
    setSelected(null);
    setFormData(buildFormData());
    if (closeForm) closeForm();
  }

  const isEditMode = Boolean(selected);

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditMode ? "Edit Track" : "Add New Track"}</h2>

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

      <button type="submit">
        {isEditMode ? "Update Track" : "Create Track"}
      </button>

      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}
