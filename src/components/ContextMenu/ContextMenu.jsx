import './ContextMenu.css'

export default function ContextMenu({ track, crud }) {
  return (
    <div className="context-menu">
      <button type="button"><img height="10px" src="/svg/ellipsis.svg" /></button>
      <ul className="context-menu">
        <li onClick={() => crud.handleEdit(track)}>Edit</li>
        <li onClick={() => crud.handleDelete(track._id)}>Delete</li>
      </ul>
    </div>
  )
}