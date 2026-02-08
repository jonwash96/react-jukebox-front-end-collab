import { useState } from 'react'
import ContextMenu from '../ContextMenu/ContextMenu';
import './NowPlaying.css'

export default function NowPlaying({ track, crud, isPlaying, setIsPlaying }) {
  const [progress, setProgress] = useState('0:00');
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const togglePlayback = () => setIsPlaying(!isPlaying);
  return (
    <section id="now-playing">
      <div id="now-playing-banner" className={expanded ? "expanded" : ''}>
        <div className="progress-bar">
          <input type="range" value={progress} readOnly max={track.duration || 0} />
        </div>
        <header onClick={() => toggleExpand()}>
          <div className="album-art" data-url={`url(${track.albumArt})` || "url(https://cdn-icons-png.flaticon.com/512/651/651717.png)"}></div>
          <div className="text">
            <h5>{track.title}</h5>
            <span>{track.artist}</span>
          </div>
          <div className="play-time flex-center"><span>{progress}/{track.duration}</span></div>
        </header>
        <div className="play-pause flex-center">
          <div onClick={() => togglePlayback()}>
            {isPlaying ? "⏸" : "▶"}
          </div>
        </div>
      </div>

      <div id="now-playing-collapse" className={expanded ? "expanded" : ''}>
        <div id="now-playing-expanded">
          <div className="album-art" data-url={`url(${track.albumArt})` || "url(https://cdn-icons-png.flaticon.com/512/651/651717.png)"}></div>
          <div className="progress-block">
            <div className="current">{progress}</div>
            <div className="duration">{track.duration || 0}</div>
            <div className="progress-bar">
              <input type="range" value={progress} max={track.duration || 0} />
            </div>
          </div>
          <div className="playback-controls">
            <button type="button" id="loop">🔁</button>
            <div className="center">
              <button type="button" id="previous">⏮</button>
              <button type="button" id="play-pause" onClick={() => togglePlayback()}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button type="button" id="next">⏭</button>
            </div>
            <ContextMenu track={track} crud={crud} />
          </div>
        </div>
      </div>
    </section>
  )
}