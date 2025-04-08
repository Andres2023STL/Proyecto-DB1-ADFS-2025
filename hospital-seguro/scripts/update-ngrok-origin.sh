#!/bin/bash
# Script para actualizar automáticamente el valor de "origin" en vite.config.js con la URL actual de ngrok

echo "🔍 Esperando URL de ngrok..."

# Obtiene la URL pública de ngrok desde su API local
URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o 'https://[a-zA-Z0-9.-]*\.ngrok-free\.app')

# Verifica si la URL fue encontrada; si no, muestra un error y termina el script
if [ -z "$URL" ]; then
  echo "❌ No se encontró ninguna URL activa de ngrok. ¿Está corriendo?"
  exit 1
fi

# Muestra por consola la URL obtenida
echo "🌐 Reemplazando origin en vite.config.js..."

# Reemplaza el valor actual de origin en vite.config.js por la nueva URL de ngrok
# Usa sed con delimitadores personalizados '|' para facilitar la sustitución de URLs
sed -i "s|origin: 'https://.*'|origin: '$URL'|g" frontend/vite.config.js

# Mensaje de éxito mostrando la URL nueva aplicada
echo "✅ Origin actualizado en vite.config.js con: $URL"
