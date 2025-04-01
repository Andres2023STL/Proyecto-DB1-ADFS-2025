<?php
// Habilitar errores (opcional en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Encabezados CORS

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Si es una solicitud OPTIONS, responder y terminar
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0);
}

// Resto del código...
if (!file_exists(__DIR__ . "/vendor/autoload.php")) {
    echo json_encode(["success" => false, "message" => "Error: Falta vendor/autoload.php"]);
    exit;
}

require __DIR__ . "/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "mi_clave_secreta";

if (!isset($_COOKIE["auth_token"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

try {
    $decoded = JWT::decode($_COOKIE["auth_token"], new Key($secret_key, 'HS256'));
    echo json_encode(["success" => true, "role" => $decoded->role]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Token inválido", "error" => $e->getMessage()]);
}
?>
