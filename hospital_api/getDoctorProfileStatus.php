<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once __DIR__ . "/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$secret_key = "mi_clave_secreta";

if (!isset($_COOKIE["auth_token"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

try {
    $decoded = JWT::decode($_COOKIE["auth_token"], new Key($secret_key, 'HS256'));
    $email = $decoded->email;

    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
        exit;
    }

    $user = $res->fetch_assoc();
    $userId = $user["id"];

    $check = $conn->query("SELECT id FROM doctors WHERE user_id = $userId");
    $filled = $check->num_rows > 0;

    echo json_encode(["success" => true, "filled" => $filled]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Token inválido"]);
}
?>
