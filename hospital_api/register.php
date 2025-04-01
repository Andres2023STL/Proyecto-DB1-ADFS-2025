<?php
ob_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$role = $data['role'] ?? 'patient';

if (!$email || !$password) {
  ob_clean();
  echo json_encode(["success" => false, "message" => "Correo y contraseña requeridos."]);
  exit;
}

$encryptedPassword = md5($password);

// Verificar si ya existe el correo
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
  ob_clean();
  echo json_encode(["success" => false, "message" => "El correo ya está registrado."]);
  exit;
}

// Insertar nuevo usuario
$stmt = $conn->prepare("INSERT INTO users (name, email, password, role, active, created_at) VALUES (?, ?, ?, ?, 1, NOW())");
$stmt->bind_param("ssss", $name, $email, $encryptedPassword, $role);

ob_clean();

if ($stmt->execute()) {
  echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente."]);
} else {
  echo json_encode(["success" => false, "message" => "Error al registrar usuario."]);
}

exit;
?>
