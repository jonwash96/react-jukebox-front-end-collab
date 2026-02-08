import { useState } from "react";
import './TrackForm.css'

export default function TrackForm({
  selected,
  setSelected,
  handleCreate,
  handleUpdate,
  closeForm
}) {
  const buildFormData = (track) => ({
    title: track?.title ?? "",
    artist: track?.artist ?? "",
  });

  const [formData, setFormData] = useState(() => buildFormData(selected));

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (selected) {
      await handleUpdate({ ...formData, _id: selected._id });
      setSelected(null);
    } else {
      await handleCreate(formData);
    }

    setFormData(buildFormData());

    if (closeForm) closeForm();
  }

  function handleCancel() {
    setSelected(null);
    setFormData(buildFormData());
    if (closeForm) closeForm();
  }

  const isEditMode = Boolean(selected);

  return (
    <dialog id="track-form-modal">
      <form onSubmit={handleSubmit}>
        <h2>{isEditMode ? "Edit Track" : "Add New Track"}</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

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
    </dialog>
  );
}
