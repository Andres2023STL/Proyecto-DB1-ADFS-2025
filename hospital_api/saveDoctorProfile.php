<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require __DIR__ . "/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
include 'db.php';

// Validar si es solicitud de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Validar cookie con JWT
$secret_key = "mi_clave_secreta";
if (!isset($_COOKIE["auth_token"])) {
    echo json_encode(["success" => false, "message" => "No autenticado"]);
    exit;
}

try {
    $decoded = JWT::decode($_COOKIE["auth_token"], new Key($secret_key, 'HS256'));
    $email = $decoded->email;

    // Obtener user_id desde el email
    $res = $conn->query("SELECT id FROM users WHERE email = '$email'");
    if ($res->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
        exit;
    }
    $user_id = $res->fetch_assoc()['id'];

    // Recibir datos del frontend
    $data = json_decode(file_get_contents("php://input"), true);

    $colegiado = $conn->real_escape_string($data['colegiado']);
    $universidad = $conn->real_escape_string($data['universidad']);
    $graduation_date = $conn->real_escape_string($data['graduation_date']);
    $especialidad = $conn->real_escape_string($data['especialidad']);
    $telefono = $conn->real_escape_string($data['telefono']);
    $foto = $conn->real_escape_string($data['foto_perfil'] ?? 'null');

    // Insertar en tabla doctors
    $stmt = $conn->prepare("INSERT INTO doctors (user_id, colegiado, universidad, graduation_date, especialidad, telefono, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("issssss", $user_id, $colegiado, $universidad, $graduation_date, $especialidad, $telefono, $foto);

    if (!$stmt->execute()) {
        echo json_encode(["success" => false, "message" => "Error al guardar perfil"]);
        exit;
    }

    $doctor_id = $conn->insert_id;

    // Guardar títulos (si existen)
    if (isset($data['titulos']) && is_array($data['titulos'])) {
        foreach ($data['titulos'] as $url) {
            $url = $conn->real_escape_string($url);
            $conn->query("INSERT INTO doctor_titles (doctor_id, url) VALUES ($doctor_id, '$url')");
        }
    }

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
}
