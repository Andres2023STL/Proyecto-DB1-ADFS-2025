<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

// 🔍 DEBUG temporal: muestra los datos recibidos
if (!$data) {
  echo json_encode(["success" => false, "message" => "No se recibió ningún dato"]);
  exit;
}

$id = isset($data['id']) ? intval($data['id']) : null;
$active = isset($data['active']) ? intval($data['active']) : null;

if ($id === null || $active === null) {
  echo json_encode(["success" => false, "message" => "Datos incompletos"]);
  exit;
}

$stmt = $conn->prepare("UPDATE users SET active = ? WHERE id = ?");
$stmt->bind_param("ii", $active, $id);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => "Error al actualizar estado"]);
}



