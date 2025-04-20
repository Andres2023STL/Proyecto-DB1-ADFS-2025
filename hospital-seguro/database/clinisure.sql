CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('doctor, admin', 'empleado', 'paciente', 'interconexion', '') DEFAULT '',
    activo BOOLEAN DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  colegiado VARCHAR(50) NOT NULL,
  especialidad VARCHAR(100) NOT NULL,
  universidad VARCHAR(100),
  fecha_graduacion DATE,
  telefono VARCHAR(20),
  imagen VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE doctor_titles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT NOT NULL,
  titulo_path VARCHAR(255) NOT NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);


-- Tabla para perfiles de empleados
CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  area VARCHAR(100),
  puesto VARCHAR(100),
  telefono VARCHAR(20),
  imagen VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero VARCHAR(20),
  dpi VARCHAR(30) NOT NULL,
  numero_afiliacion VARCHAR(50) NOT NULL,
  tiene_seguro BOOLEAN DEFAULT 0,
  codigo_seguro VARCHAR(50),
  numero_carnet_seguro VARCHAR(50),
  direccion TEXT NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  imagen VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
