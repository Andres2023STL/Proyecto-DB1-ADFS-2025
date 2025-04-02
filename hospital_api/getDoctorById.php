<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'db.php';

if (!isset($_GET["id"])) {
    echo json_encode(["error" => "ID no especificado"]);
    exit;
}

$id = intval($_GET["id"]);

// Traer datos del doctor
$sql = "SELECT d.id, u.name, u.email, d.especialidad AS specialty, d.colegiado AS licenseNumber, d.foto_perfil AS photo, d.telefono AS phone, d.universidad, YEAR(d.graduation_date) AS year
        FROM doctors d
        JOIN users u ON d.user_id = u.id
        WHERE d.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Doctor no encontrado"]);
    exit;
}

$row = $result->fetch_assoc();

// Obtener títulos
$titles_sql = "SELECT url FROM doctor_titles WHERE doctor_id = ?";
$titles_stmt = $conn->prepare($titles_sql);
$titles_stmt->bind_param("i", $id);
$titles_stmt->execute();
$titles_result = $titles_stmt->get_result();

$certifications = [];
while ($t = $titles_result->fetch_assoc()) {
    $certifications[] = $t["url"];
}

echo json_encode([
    "id" => $row["id"],
    "name" => $row["name"],
    "specialty" => $row["specialty"],
    "licenseNumber" => $row["licenseNumber"],
    "photo" => $row["photo"],
    "graduation" => [
        "university" => $row["universidad"],
        "year" => $row["year"]
    ],
    "contact" => [
        "phone" => $row["phone"],
        "email" => $row["email"]
    ],
    "certifications" => $certifications
]);
