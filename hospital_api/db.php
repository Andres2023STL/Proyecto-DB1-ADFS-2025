<?php
$host = 'localhost';
$user = 'root';
$pass = ''; // O tu contraseña de MySQL
$dbname = 'hospital_db'; // Asegúrate que esta BD exista

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}
?>
