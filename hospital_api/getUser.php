<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require __DIR__ . "/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
include 'db.php';

$secret_key = "mi_clave_secreta";

if (!isset($_COOKIE["auth_token"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

try {
    $decoded = JWT::decode($_COOKIE["auth_token"], new Key($secret_key, 'HS256'));
    $email = $decoded->email;

    $stmt = $conn->prepare("SELECT id, name, role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        echo json_encode([
            "success" => true,
            "userId" => $user["id"],
            "name" => $user["name"],
            "role" => $user["role"]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Token inválido", "error" => $e->getMessage()]);
}
?>

