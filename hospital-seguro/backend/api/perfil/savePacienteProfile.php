<?php
require_once '../../config/db.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// 🔧 CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204);
    exit;
}

try {
    if (!isset($_COOKIE['token'])) {
        throw new Exception("Token no encontrado");
    }

    $jwt = $_COOKIE['token'];
    $decoded = JWT::decode($jwt, new Key("CLINISURE_SECRET_KEY", 'HS256'));
    $userId = $decoded->data->id;

    $fecha_nacimiento = $_POST['fecha_nacimiento'] ?? null;
    $genero = $_POST['genero'] ?? null;
    $dpi = trim($_POST['dpi'] ?? '');
    $numero_afiliacion = trim($_POST['numero_afiliacion'] ?? '');
    $codigo_seguro = $_POST['codigo_seguro'] ?? null;
    $numero_carnet_seguro = $_POST['numero_carnet_seguro'] ?? null;
    $direccion = trim($_POST['direccion'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $tiene_seguro = isset($_POST['tiene_seguro']) && $_POST['tiene_seguro'] == 'true';

    if (!$fecha_nacimiento || !$dpi || !$numero_afiliacion || !$direccion || !$telefono) {
        throw new Exception("Faltan campos obligatorios");
    }

    $rutaImagen = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $dir = __DIR__ . '/../../public/uploads/pacientes/';
        if (!is_dir($dir)) mkdir($dir, 0777, true);

        $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
        $nombreArchivo = 'paciente_' . $userId . '.' . $ext;
        $rutaRelativa = 'uploads/pacientes/' . $nombreArchivo;
        $rutaCompleta = $dir . $nombreArchivo;

        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
            throw new Exception("Error al subir la imagen");
        }

        $rutaImagen = $rutaRelativa;
    }

    $stmt = $pdo->prepare("
        INSERT INTO pacientes (
            user_id, fecha_nacimiento, genero, dpi, numero_afiliacion,
            tiene_seguro, codigo_seguro, numero_carnet_seguro, direccion, telefono, imagen
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            fecha_nacimiento = VALUES(fecha_nacimiento),
            genero = VALUES(genero),
            dpi = VALUES(dpi),
            numero_afiliacion = VALUES(numero_afiliacion),
            tiene_seguro = VALUES(tiene_seguro),
            codigo_seguro = VALUES(codigo_seguro),
            numero_carnet_seguro = VALUES(numero_carnet_seguro),
            direccion = VALUES(direccion),
            telefono = VALUES(telefono),
            imagen = VALUES(imagen)
    ");
    $stmt->execute([
        $userId, $fecha_nacimiento, $genero, $dpi, $numero_afiliacion,
        $tiene_seguro, $codigo_seguro, $numero_carnet_seguro, $direccion, $telefono, $rutaImagen
    ]);

    echo json_encode(["success" => true, "message" => "Ficha del paciente guardada correctamente"]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
