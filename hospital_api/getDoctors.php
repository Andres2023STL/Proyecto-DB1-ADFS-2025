<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$sql = "SELECT d.id, u.name, d.especialidad, d.colegiado, d.universidad, d.graduation_date, d.telefono, d.foto_perfil, d.user_id
        FROM doctors d
        JOIN users u ON d.user_id = u.id";

$result = $conn->query($sql);

$doctors = [];

while ($row = $result->fetch_assoc()) {
    $doctorId = $row["id"];

    // Obtener títulos desde doctor_titles
    $titlesQuery = $conn->query("SELECT url FROM doctor_titles WHERE doctor_id = $doctorId");
    $titles = [];

    while ($titleRow = $titlesQuery->fetch_assoc()) {
        $titles[] = $titleRow["url"];
    }

    $doctors[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "specialty" => $row["especialidad"],
        "licenseNumber" => $row["colegiado"],
        "photo" => $row["foto_perfil"],
        "graduation" => [
            "university" => $row["universidad"],
            "year" => date("Y", strtotime($row["graduation_date"]))
        ],
        "contact" => [
            "phone" => $row["telefono"],
            "email" => getUserEmail($row["user_id"], $conn)
        ],
        "certifications" => $titles
    ];
}

// Obtener email por separado
function getUserEmail($userId, $conn) {
    $stmt = $conn->prepare("SELECT email FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        return $row["email"];
    }
    return null;
}

echo json_encode($doctors);
?>
