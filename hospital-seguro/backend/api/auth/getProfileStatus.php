<?php
require_once '../../config/db.php';
require_once '../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

try {
    if (!isset($_COOKIE['token'])) {
        echo json_encode(["success" => false, "message" => "Token no encontrado"]);
        exit;
    }

    $jwt = $_COOKIE['token'];
    $secret_key = "CLINISURE_SECRET_KEY"; // 👈 Usa el real aquí

    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    $userId = $decoded->data->id;
    $rol = $decoded->data->rol;

    $perfilCompleto = false;
    $tabla = '';

    // Detectar tabla según rol
// Detectar tabla según rol
switch ($rol) {
    case 'doctor':
        $tabla = 'doctors';
        break;
    case 'empleado':
        $tabla = 'empleados'; // ← CAMBIO AQUÍ
        break;
    case 'paciente':
        $tabla = 'pacientes';
        break;
    case 'interconexion':
        $tabla = 'interconexion_users';
        break;
    default:
        echo json_encode([
            "success" => true,
            "perfilCompleto" => true,
            "rol" => $rol
        ]);
        exit;
}


    // Consultar si el perfil está completo
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM $tabla WHERE user_id = ?");
    $stmt->execute([$userId]);
    $perfilCompleto = $stmt->fetchColumn() > 0;

    echo json_encode([
        "success" => true,
        "perfilCompleto" => $perfilCompleto,
        "rol" => $rol
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
