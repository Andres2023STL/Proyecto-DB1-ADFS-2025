<?php
// Mostrar errores y configurar CORS y cabeceras
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Manejar la solicitud preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit();
}

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Consulta: devuelve todos los pacientes
    $sql = "SELECT * FROM paciente";
    $result = $conn->query($sql);
    $patients = [];

    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
    echo json_encode(['success' => true, 'patients' => $patients]);
    exit;
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Registro de paciente
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
        exit;
    }

    // Verifica que se reciban los campos obligatorios
    $required = ['dpi', 'nombre', 'f_nacimiento', 'codigo_seguro', 'direccion', 'telefono'];
    foreach ($required as $field) {
        if (!isset($data[$field])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => "El campo $field es obligatorio"]);
            exit;
        }
    }

    // Si no se envía foto o es una cadena vacía, se asigna null
    if (!isset($data['foto']) || trim($data['foto']) === "") {
        $data['foto'] = null;
    }

    // Si no se envía user_id, se asigna null
    $user_id = (isset($data['user_id']) && trim($data['user_id']) !== "") ? $data['user_id'] : null;

    // Prepara la consulta con sentencias preparadas para evitar inyección SQL
    $stmt = $conn->prepare("INSERT INTO paciente (dpi, nombre, f_nacimiento, foto, codigo_seguro, direccion, telefono, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => "Error al preparar la consulta: " . $conn->error]);
        exit;
    }

    // Se asumen los tipos de datos
    $stmt->bind_param(
        "sssssssi",
        $data['dpi'],
        $data['nombre'],
        $data['f_nacimiento'],
        $data['foto'],
        $data['codigo_seguro'],
        $data['direccion'],
        $data['telefono'],
        $user_id
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Paciente registrado exitosamente']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error al registrar el paciente: ' . $stmt->error]);
    }
    $stmt->close();
    exit;
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
$conn->close();

