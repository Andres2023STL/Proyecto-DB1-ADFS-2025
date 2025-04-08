#!/bin/bash

echo "🚀 Iniciando frontend + ngrok + actualización de origin..."

# Verifica si el puerto 5173 ya está en uso
if lsof -i :5173 &> /dev/null; then
  echo "❌ Error: el puerto 5173 ya está en uso. Cerrá Vite antes de continuar."
  exit 1
fi

# Paso 1: Iniciar Vite (React) en segundo plano
cd frontend
npm run dev -- --host=0.0.0.0 &
PID_VITE=$!
cd ..

# Esperar unos segundos para que Vite levante
sleep 2

# Paso 2: Verifica si ya hay un túnel activo de ngrok
if curl -s http://127.0.0.1:4040/api/tunnels | grep -q "ngrok-free.app"; then
  echo "🔁 Ya hay un túnel de ngrok activo. No se iniciará uno nuevo."
else
  echo "🌐 Iniciando ngrok..."
  ngrok http 5173 > /dev/null &
  sleep 3
fi

# Paso 3: Esperar a que ngrok genere la URL (máximo 10s)
RETRIES=10
while [ $RETRIES -gt 0 ]; do
  URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o 'https://[a-zA-Z0-9.-]*\.ngrok-free\.app')
  if [ -n "$URL" ]; then
    echo "🌐 Ngrok URL detectada: $URL"
    break
  fi
  echo "⏳ Esperando a que ngrok levante... ($RETRIES)"
  RETRIES=$((RETRIES - 1))
  sleep 1
done

if [ -z "$URL" ]; then
  echo "❌ No se pudo obtener la URL de ngrok. ¿Está bloqueado o caído?"
  echo "ℹ️  Visitá https://dashboard.ngrok.com para revisar tus sesiones activas."
  kill $PID_VITE
  exit 1
fi

# Paso 4: Actualizar vite.config.js con la URL de ngrok
sed -i "s|origin: 'https://.*'|origin: '$URL'|g" frontend/vite.config.js

# Mensaje final
echo "✅ Todo listo. Vite está corriendo, ngrok activo y origin actualizado."
echo "🌍 URL pública: $URL"
echo "🛑 Para detener todo: ejecutá 'kill $PID_VITE'"
