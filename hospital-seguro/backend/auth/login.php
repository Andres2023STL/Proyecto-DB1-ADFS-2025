<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../config/db.php';
require_once __DIR__ . '/../vendor/autoload.php';

$frontend_origin = 'http://localhost:5173';

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: $frontend_origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    http_response_code(204);
    exit;
}

// CORS normal
header("Access-Control-Allow-Origin: $frontend_origin");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Leer body
$input = json_decode(file_get_contents("php://input"), true);
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
        exit;
    }

    if (!$user['activo']) {
        echo json_encode(['success' => false, 'message' => 'Tu cuenta aún no ha sido activada']);
        exit;
    }

    $payload = [
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24),
        'data' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'nombre' => $user['nombre'],
            'rol' => $user['rol'],
            'tipo_empleado' => $user['rol'] === 'empleado' ? $user['tipo_empleado'] : null
        ]
    ];
    
    
    

    $jwt = JWT::encode($payload, 'CLINISURE_SECRET_KEY', 'HS256');

    setcookie('token', $jwt, [
        'expires' => time() + (60 * 60 * 24),
        'path' => '/',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión exitoso',
        'user' => [
            'id' => $user['id'],
            'nombre' => $user['nombre'],
            'email' => $user['email'],
            'rol' => $user['rol'],
            'tipo_empleado' => $user['rol'] === 'empleado' ? $user['tipo_empleado'] : null
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor']);
}
