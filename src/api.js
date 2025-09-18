const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export async function apiFetch(path, { method = "GET", headers = {}, body } = {}) {
  const token = localStorage.getItem("token");

  const finalBody =
    body === undefined || body === null
      ? undefined
      : (typeof body === "string" ? body : JSON.stringify(body));

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: finalBody,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `API error: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}