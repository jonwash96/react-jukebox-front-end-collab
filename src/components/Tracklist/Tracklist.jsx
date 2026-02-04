import { useState, useEffect } from 'react'

export default function Tracklist({tracks, crud}) {
    useEffect(()=>console.log("@Tracklist: ", tracks),[tracks])
    return(
        <section id="tracklist">
        <h2>Tracklist</h2>
        <ul className="tracklist">
            {!tracks && "loading. . ."}
            {tracks.map(track => 
                <li key={track._id} className="tracklist" onClick={()=>null}>
                    <div className="img"><div></div></div>
                    <div className="text">
                        <h5>{track.title}</h5>
                        <span>{track.artist}</span>
                    </div>
                    <ContextMenu track={track} crud={crud} />
                </li>
            )}
        </ul>
        </section>
    )
}

function ContextMenu({track, crud}) {

    return(
        <div className="context-menu">
            <button type="button"><img height="10px" src="/svg/ellipsis.svg" /></button>
            <ul className="context-menu">
                <li onClick={()=>crud.handleEdit(track._id)}>Edit</li>
                <li onClick={()=>crud.handleDelete(track._id)}>Delete</li>
            </ul>
        </div>
    )
}