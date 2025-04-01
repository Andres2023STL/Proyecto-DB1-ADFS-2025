<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// 📌 Manejar preflight OPTIONS request (CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// 📌 Destruir la cookie de autenticación
setcookie("auth_token", "", [
    "expires" => time() - 3600, 
    "path" => "/",
    "domain" => "localhost",
    "secure" => false, 
    "httponly" => true,
    "samesite" => "Lax"
]);

// 📌 Evitar que se envíe doble respuesta
if (!headers_sent()) {
    echo json_encode(["success" => true, "message" => "Sesión cerrada"]);
}

exit; // 🚀 Asegurar que no haya salida extra
?>
