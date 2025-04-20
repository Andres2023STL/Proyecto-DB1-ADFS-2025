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
    // ✅ Verificar token
    if (!isset($_COOKIE['token'])) {
        throw new Exception("Token no encontrado");
    }

    $jwt = $_COOKIE['token'];
    $decoded = JWT::decode($jwt, new Key("CLINISURE_SECRET_KEY", 'HS256'));
    $userId = $decoded->data->id;

    // ✅ Validar campos
    $especialidad = trim($_POST['especialidad'] ?? '');
    $colegiado = trim($_POST['colegiado'] ?? '');
    $universidad = trim($_POST['universidad'] ?? '');
    $fecha_graduacion = $_POST['fecha_graduacion'] ?? null;
    $telefono = trim($_POST['telefono'] ?? '');

    if (!$especialidad || !$colegiado || !$universidad || !$telefono) {
        throw new Exception("Todos los campos son obligatorios");
    }

    // 📸 Subida de imagen de perfil
    $rutaImagen = null;
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $dir = __DIR__ . '/../../public/uploads/doctors/';
        if (!is_dir($dir)) mkdir($dir, 0777, true);

        $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
        $nombreArchivo = 'doctor_' . $userId . '.' . $ext;
        $rutaRelativa = 'uploads/doctors/' . $nombreArchivo;
        $rutaCompleta = $dir . $nombreArchivo;

        if (!move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
            throw new Exception("Error al subir la imagen");
        }

        $rutaImagen = $rutaRelativa;
    }

    // 💾 Insertar o actualizar perfil del doctor
    $stmt = $pdo->prepare("
        INSERT INTO doctors (user_id, colegiado, especialidad, universidad, fecha_graduacion, telefono, imagen)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE colegiado = VALUES(colegiado), especialidad = VALUES(especialidad),
        universidad = VALUES(universidad), fecha_graduacion = VALUES(fecha_graduacion),
        telefono = VALUES(telefono), imagen = VALUES(imagen)
    ");
    $stmt->execute([$userId, $colegiado, $especialidad, $universidad, $fecha_graduacion, $telefono, $rutaImagen]);

    // 🔍 Obtener doctor_id para los títulos
    $stmtGet = $pdo->prepare("SELECT id FROM doctors WHERE user_id = ?");
    $stmtGet->execute([$userId]);
    $doctorId = $stmtGet->fetchColumn();

    // 📎 Subida de títulos
    $titlesPaths = [];
    if (isset($_FILES['titulos']) && is_array($_FILES['titulos']['tmp_name'])) {
        $tituloDir = __DIR__ . '/../../public/uploads/titles/';
        if (!is_dir($tituloDir)) mkdir($tituloDir, 0777, true);

        foreach ($_FILES['titulos']['tmp_name'] as $index => $tmpPath) {
            if ($_FILES['titulos']['error'][$index] === UPLOAD_ERR_OK) {
                $ext = pathinfo($_FILES['titulos']['name'][$index], PATHINFO_EXTENSION);
                $nombreTitulo = 'titulo_' . $userId . '_' . uniqid() . '.' . $ext;
                $rutaRelativa = 'uploads/titles/' . $nombreTitulo;
                $rutaCompleta = $tituloDir . $nombreTitulo;

                if (move_uploaded_file($tmpPath, $rutaCompleta)) {
                    $titlesPaths[] = $rutaRelativa;
                }
            }
        }

        // Guardar en `doctor_titles`
        foreach ($titlesPaths as $tituloPath) {
            $stmtTitulo = $pdo->prepare("INSERT INTO doctor_titles (doctor_id, titulo_path) VALUES (?, ?)");
            $stmtTitulo->execute([$doctorId, $tituloPath]);
        }
    }

    // ✅ Todo ok
    echo json_encode([
        "success" => true,
        "message" => "Perfil del doctor guardado correctamente"
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage()
    ]);
}
