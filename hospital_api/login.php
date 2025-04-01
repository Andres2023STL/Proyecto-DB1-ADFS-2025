<?php
// 🔥 Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// 📌 Manejar preflight OPTIONS request (para CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// 📌 Importar JWT (CORRECCIÓN: Ahora está en la parte superior)
require __DIR__ . "/vendor/autoload.php";
use Firebase\JWT\JWT;

// 📌 Conectar a MySQL
$conn = new mysqli("localhost", "root", "", "hospital_db");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Error en la conexión a la base de datos"]));
}

// 📌 Recibir datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
    exit;
}

$email = $conn->real_escape_string($data["email"]);
$password = md5($conn->real_escape_string($data["password"])); // 🔥 Hash con MD5

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($password === $user["password"]) {
        if ($user["active"]) {
            $secret_key = "mi_clave_secreta";
            $payload = [
                "email" => $user["email"],
                "role" => $user["role"],
                "exp" => time() + 3600 // Expira en 1 hora
            ];

            $token = JWT::encode($payload, $secret_key, 'HS256');

            setcookie("auth_token", $token, [
                "expires" => time() + 3600,
                "path" => "/",
                "domain" => "localhost",
                "secure" => false,
                "httponly" => true,
                "samesite" => "Lax"
            ]);

            echo json_encode([
                "success" => true,
                "role" => $user["role"],
                "token" => $token
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Tu cuenta aún no ha sido activada."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
}

$conn->close();
?>
