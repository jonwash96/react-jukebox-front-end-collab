const API_URL = (import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000")
const BASE_URL = `${API_URL}/tracks`;

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Expected JSON response, got ${contentType || "unknown"}: ${text.slice(0, 80)}`,
    );
  }

  return res.json();
}

export async function index() {
    const res = await fetch(BASE_URL);
    const data = await handleResponse(res);
    console.log("@trackSvc.index: ", data);
    return data;
}

export async function showOne(id) {
    try {
        const res = await fetch(BASE_URL+'/'+id, {
            method:'GET',
            headers:{"Content-Type":"application/json"},
        })
        return await handleResponse(res);
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

        return await handleResponse(res);
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

        return await handleResponse(res);
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

        await handleResponse(res);
        return true;
    } catch (err) {
        console.error(err)
    }
}
