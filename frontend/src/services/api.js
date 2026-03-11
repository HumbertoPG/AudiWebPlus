const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function handleResponse(res, name = "request") {
  const text = await res.text();

  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`${name} - respuesta no válida:`, text);
    throw new Error(`${name}: respuesta no es JSON válido`);
  }

  if (!res.ok) {
    console.error(`${name} - status ${res.status}:`, data);
    throw new Error(`${name}: ${res.status}`);
  }

  return data;
}

export async function getCars() {
  const res = await fetch(`${API}/cars`);
  return handleResponse(res, "getCars");
}

export async function getCar(id) {
  const res = await fetch(`${API}/cars/${id}`);
  return handleResponse(res, "getCar");
}

export async function getConfigurations(id) {
  const res = await fetch(`${API}/cars/${id}/configurations`);
  return handleResponse(res, "getConfigurations");
}

export async function createCar(data) {
  const res = await fetch(`${API}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "createCar");
}

export async function updateCar(id, data) {
  const res = await fetch(`${API}/cars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "updateCar");
}

export async function deleteCar(id) {
  const res = await fetch(`${API}/cars/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res, "deleteCar");
}

export async function sendChat(message) {
  const res = await fetch(`${API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return handleResponse(res, "sendChat");
}

export async function subscribeNewsletter(email) {
  const res = await fetch(`${API}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res, "subscribeNewsletter");
}

export async function requestFinancing(data) {
  const res = await fetch(`${API}/financing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "requestFinancing");
}

export async function getUsedCars() {
  const res = await fetch(`${API}/used_cars`);
  return handleResponse(res, "getUsedCars");
}

export async function getUsedCar(id) {
  const res = await fetch(`${API}/used_cars/${id}`);
  return handleResponse(res, "getUsedCar");
}

export async function createAppointment(appointmentData) {
  const res = await fetch(`${API}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  return handleResponse(res, "createAppointment");
}

export async function getAppointments() {
  const res = await fetch(`${API}/appointments`);
  return handleResponse(res, "getAppointments");
}
export async function createUsedCar(data) {
  const res = await fetch(`${API}/used_cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "createUsedCar");
}

export async function updateUsedCar(id, data) {
  const res = await fetch(`${API}/used_cars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res, "updateUsedCar");
}

export async function deleteUsedCar(id) {
  const res = await fetch(`${API}/used_cars/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res, "deleteUsedCar");
}