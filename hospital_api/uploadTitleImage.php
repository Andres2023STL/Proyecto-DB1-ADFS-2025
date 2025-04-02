<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$targetDir = __DIR__ . "/uploads/";
$publicUrlBase = "http://localhost/hospital_api/uploads/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $filename = basename($_FILES['file']['name']);
    $uniqueName = uniqid() . "_" . $filename;
    $targetFile = $targetDir . $uniqueName;

    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        echo json_encode(["success" => true, "url" => $publicUrlBase . $uniqueName]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al mover el archivo."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No se recibió archivo."]);
}
?>
