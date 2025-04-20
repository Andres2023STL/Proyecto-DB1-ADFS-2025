<?php
$frontend_origin = 'http://localhost:5173';

// 🛡️ Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: $frontend_origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204);
    exit;
}

// CORS normal
header("Access-Control-Allow-Origin: $frontend_origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// 🚫 Solo permitimos POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// 🧹 Borrar cookie del token
setcookie('token', '', time() - 3600, '/', '', false, true); // secure=true si usás HTTPS

echo json_encode([
    'success' => true,
    'message' => 'Sesión cerrada correctamente'
]);
