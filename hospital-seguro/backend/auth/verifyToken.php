<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once '../config/db.php';
require_once __DIR__ . '/../vendor/autoload.php';

$frontend_origin = 'http://localhost:5173';
header("Access-Control-Allow-Origin: $frontend_origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    http_response_code(204);
    exit;
}

try {
    if (!isset($_COOKIE['token'])) {
        throw new Exception("Token no encontrado");
    }

    $jwt = $_COOKIE['token'];
    $clave_secreta = 'CLINISURE_SECRET_KEY';

    $decoded = JWT::decode($jwt, new Key($clave_secreta, 'HS256'));

    // ✅ Acceder a data correctamente
    $userData = $decoded->data;

// ✅ Enviar respuesta con datos del usuario
echo json_encode([
    'success' => true,
    'user' => [
        'id' => $userData->id,
        'email' => $userData->email,
        'rol' => $userData->rol,
        'nombre' => $userData->nombre ?? '', // opcional
        'tipo_empleado' => $userData->tipo_empleado ?? null
    ]
]);

} catch (Exception $e) {
    error_log("❌ Error en verifyToken: " . $e->getMessage());
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
