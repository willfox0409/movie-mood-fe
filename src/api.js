const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

function joinUrl(base, path) {
  return `${String(base).replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

export async function apiFetch(path, { method = "GET", headers = {}, body } = {}) {
  const token = localStorage.getItem("token");
  const url = joinUrl(API_BASE, path);

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `API error: ${res.status}`;
    throw new Error(msg);
  }
  return data;
}