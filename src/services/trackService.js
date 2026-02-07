const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

export async function index() {
    return fetch(BASE_URL)
        .then(response => response.json())
        .then(data => {
            console.log("@trackSvc.index: ", data)
            return data
        })
}

export async function showOne(id) {
    try {
        const res = await fetch(BASE_URL+'/'+id, {
            method:'GET',
            headers:{"Content-Type":"application/json"},
        })
        if (!res) throw new Error("error")
        return await res.json();
    } catch (err) {
        console.error(err)
    }
}

export async function create(track) {
    try {
        const res = await fetch(BASE_URL, {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(track)
        })

        return await res.json();
    } catch (err) {
        console.error(err)
    }
}

export async function update(track) {
    try {
        const res = await fetch(`${BASE_URL}/${track._id}`, {
            method:'PUT',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(track)
        });

        return await res.json().updatedTrack;
    } catch (err) {
        console.error(err)
    }
}

export async function deleteTrack(id) {
    try {
        const res = await fetch(BASE_URL+'/'+id, {
            method:'DELETE',
            headers:{"Content-Type":"application/json"},
        });

        if (!res.ok) throw new Error("Failed to Delete Track.");
        return true;
    } catch (err) {
        console.error(err)
    }
}