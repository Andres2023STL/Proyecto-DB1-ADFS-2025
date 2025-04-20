<?php
// 🚫 Bloquea cualquier salida accidental (antes de headers)
ob_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../../config/db.php';
require_once '../../config/mailer.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204);
    ob_end_clean(); // 💥 Limpia el búfer
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (
    !isset($input['id'], $input['nombre'], $input['email'], $input['rol'], $input['activo']) ||
    !is_numeric($input['id']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)
) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Datos inválidos o incompletos']);
    exit;
}

$id = intval($input['id']);
$nombre = trim($input['nombre']);
$email = trim($input['email']);
$rol = trim($input['rol']);
$activo = intval($input['activo']);
$tipoEmpleado = $input['tipo_empleado'] ?? null;

try {
    // Estado previo
    $prevStmt = $pdo->prepare("SELECT activo FROM users WHERE id = ?");
    $prevStmt->execute([$id]);
    $prevActivo = $prevStmt->fetchColumn();

    $sql = "
        UPDATE users 
        SET nombre = :nombre, email = :email, rol = :rol, activo = :activo, tipo_empleado = :tipo_empleado 
        WHERE id = :id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':rol', $rol);
    $stmt->bindParam(':activo', $activo, PDO::PARAM_INT);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($rol === 'empleado') {
        if (!in_array($tipoEmpleado, ['hospital', 'seguro'])) {
            ob_end_clean();
            echo json_encode(['success' => false, 'message' => 'Tipo de empleado inválido']);
            exit;
        }
        $stmt->bindParam(':tipo_empleado', $tipoEmpleado);
    } else {
        $null = null;
        $stmt->bindParam(':tipo_empleado', $null, PDO::PARAM_NULL);
    }

    $stmt->execute();

    // Correos
    if ($prevActivo == 0 && $activo == 1) {
        $asunto = "✅ Cuenta activada en CliniSure";
        $mensaje = "
            <h2>Hola $nombre,</h2>
            <p>Tu cuenta ha sido activada correctamente por un administrador.</p>
            <p>Ahora puedes ingresar al sistema con tu correo <strong>$email</strong>.</p>
            <p>Gracias por usar CliniSure.</p>
        ";
        enviarCorreo($email, $asunto, $mensaje);
    }

    if ($prevActivo == 1 && $activo == 0) {
        $asunto = "🚫 Cuenta desactivada en CliniSure";
        $mensaje = "
            <h2>Hola $nombre,</h2>
            <p>Tu cuenta ha sido desactivada temporalmente por un administrador.</p>
            <p>No podrás iniciar sesión hasta que se vuelva a activar.</p>
        ";
        enviarCorreo($email, $asunto, $mensaje);
    }

    ob_end_clean(); // ✅ Limpia el búfer antes de devolver JSON
    echo json_encode(['success' => true, 'message' => 'Usuario actualizado']);
} catch (PDOException $e) {
    ob_end_clean();
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error en el servidor: ' . $e->getMessage()
    ]);
}
