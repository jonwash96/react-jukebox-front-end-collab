import './Tracklist.css'
import ContextMenu from '../ContextMenu/ContextMenu'

export default function Tracklist({ tracks, crud, handleSelectSong, nowPlaying }) {
  return (
    <section id="tracklist">
      <h2>Tracklist</h2>
      <ul className="tracklist">
        {!tracks && "loading. . ."}
        {tracks.map(track =>
          <li key={track._id}
            className={`tracklist ${nowPlaying?._id === track._id && "now-playing"}`}>
            <div className="selectable-area" onClick={() => handleSelectSong(track)}>
              <div className="img">
                <div>
                  {nowPlaying?._id === track._id &&
                    <img src="https://cdn-icons-png.flaticon.com/512/6707/6707113.png" />}
                </div>
              </div>
              <div className="text">
                <h5>{track.title}</h5>
                <span>{track.artist}</span>
              </div>
            </div>
            <ContextMenu track={track} crud={crud} />
          </li>
        )}
      </ul>
    </section>
  )
}

