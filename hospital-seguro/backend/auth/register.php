<?php
ob_start(); // Inicia el buffer de salida

ini_set('display_errors', 1);
error_reporting(E_ALL);

$frontend_origin = 'http://localhost:5173';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: $frontend_origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204);
    ob_end_clean(); // Limpiamos cualquier salida
    exit;
}

header("Access-Control-Allow-Origin: $frontend_origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

require_once '../config/db.php';
require_once '../config/mailer.php';

try {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['nombre'], $input['email'], $input['password'])) {
        die(json_encode(['success' => false, 'message' => 'Datos incompletos']));
    }

    $nombre = htmlspecialchars(trim($input['nombre']));
    $email = filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL);
    $password = trim($input['password']);

    if (!$email) {
        die(json_encode(['success' => false, 'message' => 'Correo no válido']));
    }

    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        die(json_encode(['success' => false, 'message' => 'Ya existe una cuenta con este correo.']));
    }

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (nombre, email, password, rol, activo) VALUES (?, ?, ?, '', 0)");
    $stmt->execute([$nombre, $email, $passwordHash]);

    // Correo al usuario
    enviarCorreo($email, "¡Bienvenido a CliniSure!", "
        <h1>Hola $nombre</h1>
        <p>Gracias por registrarte en <strong>CliniSure</strong>.</p>
        <p>Tu cuenta está pendiente de activación por un administrador.</p>
    ");

    // Correo al admin
    enviarCorreo("sistemahospital7@gmail.com", "Nuevo Usuario Registrado", "
        <h3>Nuevo registro en CliniSure</h3>
        <ul>
            <li><strong>Nombre:</strong> $nombre</li>
            <li><strong>Email:</strong> $email</li>
        </ul>
    ");

    $output = ['success' => true, 'message' => 'Registro exitoso. Revisa tu correo.'];
} catch (Throwable $e) {
    http_response_code(500);
    $output = ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
}

ob_end_clean(); // Elimina cualquier salida previa
die(json_encode($output)); // Imprime solo JSON puro
