const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export async function apiFetch(path, { method = "GET", headers = {}, body } = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // swallow JSON parse error for empty responses
  }

  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `API error: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}