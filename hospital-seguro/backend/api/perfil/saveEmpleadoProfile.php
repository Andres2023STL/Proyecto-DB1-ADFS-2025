<?php
// Mostrar errores en desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../../config/db.php';
require_once '../../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// 🔧 CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204);
    exit;
}
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

try {
    // Verificar token
    if (!isset($_COOKIE['token'])) {
        throw new Exception("Token no encontrado");
    }

    $jwt = $_COOKIE['token'];
    $clave_secreta = "CLINISURE_SECRET_KEY";
    $decoded = JWT::decode($jwt, new Key($clave_secreta, 'HS256'));
    $userId = $decoded->data->id;

    // Obtener campos
    $puesto = trim($_POST['puesto'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $extension = trim($_POST['extension'] ?? '');

    if ($puesto === '' || $telefono === '') {
        throw new Exception("Todos los campos obligatorios deben estar completos");
    }

    // Subir imagen
    $rutaImagen = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $dir = __DIR__ . '/../../public/uploads/empleados/';
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
        $nombreArchivo = 'empleado_' . $userId . '.' . $ext;
        $rutaRelativa = 'uploads/empleados/' . $nombreArchivo;
        $rutaCompleta = $dir . $nombreArchivo;

        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
            throw new Exception("Error al subir la imagen");
        }

        $rutaImagen = $rutaRelativa;
    }

    // Insertar o actualizar
    $stmt = $pdo->prepare("
        INSERT INTO empleados (user_id, puesto, telefono, extension, imagen)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE puesto = VALUES(puesto), telefono = VALUES(telefono), extension = VALUES(extension), imagen = VALUES(imagen)
    ");
    $stmt->execute([$userId, $puesto, $telefono, $extension, $rutaImagen]);

    echo json_encode(["success" => true, "message" => "Perfil del empleado guardado correctamente"]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error del servidor: " . $e->getMessage(),
        "file" => $e->getFile(),
        "line" => $e->getLine()
    ]);
}
