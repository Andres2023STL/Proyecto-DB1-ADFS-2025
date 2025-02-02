const API_URL = 'http://localhost:4000/api/hospital';

export const getCitas = async () => {
  const response = await fetch(`${API_URL}/citas`);
  return response.json();
};

export const createCita = async (data) => {
  const response = await fetch(`${API_URL}/citas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
