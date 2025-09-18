const RAW_API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// strip any trailing slashes from base
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");

export async function apiFetch(path, { method = "GET", headers = {}, body } = {}) {
  const token = localStorage.getItem("token");

  // ensure exactly one slash between base and path
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

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