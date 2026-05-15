const API = import.meta.env.VITE_URL_API;

export async function login(username: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Error del servidor" }));
    throw new Error(error.detail || "Credenciales inválidas");
  }

  const data = await response.json();
  localStorage.setItem("token", data.access_token);

  const payload = JSON.parse(atob(data.access_token.split(".")[1]));
  localStorage.setItem("user", JSON.stringify(payload));

  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
