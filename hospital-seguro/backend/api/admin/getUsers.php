<?php
require_once '../../config/db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$offset = ($page - 1) * $limit;

$search = $_GET['search'] ?? '';
$rol = $_GET['rol'] ?? '';
$fecha = $_GET['fecha'] ?? '';

try {
    // 👇 Incluir tipo_empleado
    $sql = "SELECT id, nombre, email, rol, activo, tipo_empleado, fecha_creacion FROM users WHERE 1=1";
    $params = [];

    if ($search !== '') {
        $sql .= " AND email LIKE ?";
        $params[] = "%$search%";
    }

    if ($rol !== '') {
        $sql .= " AND rol = ?";
        $params[] = $rol;
    }

    if ($fecha !== '') {
        $sql .= " AND DATE(fecha_creacion) = ?";
        $params[] = $fecha;
    }

    // 🧠 LIMIT y OFFSET directo
    $sql .= " LIMIT $limit OFFSET $offset";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 🎯 Total sin filtros
    $countStmt = $pdo->query("SELECT COUNT(*) FROM users");
    $total = $countStmt->fetchColumn();

    foreach ($usuarios as &$u) {
        $u['activo'] = (int) $u['activo'];
    }
    
    echo json_encode([
        "success" => true,
        "data" => $usuarios,
        "total" => intval($total),
        "page" => $page
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error en el servidor: " . $e->getMessage()
    ]);
}
