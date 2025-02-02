const BASE_URL = 'https://api.sistemaintegrado.com';

export async function fetchData(endpoint, method = 'GET', data = null) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  });
  
  if (!response.ok) {
    throw new Error('Error al comunicarse con el servidor');
  }

  return response.json();
}
