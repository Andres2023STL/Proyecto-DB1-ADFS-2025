<?php

class AllTestsTest extends \Codeception\Test\Unit
{
    /**
     * Simula la lógica de login.
     */
    private function simulateLogin(array $data)
    {
        // "BD" en memoria (simulada)
        $fakeUsers = [
            [
                'id'       => 1,
                'email'    => 'user1@example.com',
                'password' => md5('1234'), // contraseñas guardadas con md5
                'active'   => true,
                'role'     => 'doctor'
            ],
            [
                'id'       => 2,
                'email'    => 'inactive@example.com',
                'password' => md5('1234'),
                'active'   => false,
                'role'     => 'user'
            ],
        ];
        // "Tabla" doctors: vacía => si es doctor y no aparece aquí => needsProfile = true
        $fakeDoctors = [];

        // Validamos entrada
        if (empty($data['email']) || empty($data['password'])) {
            return ["success" => false, "message" => "Faltan datos"];
        }

        $email = $data['email'];
        $password = md5($data['password']);

        // Buscamos el usuario
        $userFound = null;
        foreach ($fakeUsers as $u) {
            if ($u['email'] === $email) {
                $userFound = $u;
                break;
            }
        }

        if (!$userFound) {
            return ["success" => false, "message" => "Usuario no encontrado"];
        }

        // Verificamos la contraseña
        if ($password !== $userFound['password']) {
            return ["success" => false, "message" => "Contraseña incorrecta"];
        }

        // Verificamos si la cuenta está activa
        if (!$userFound['active']) {
            return ["success" => false, "message" => "Tu cuenta aún no ha sido activada."];
        }

        // Si es doctor, revisa si tiene perfil
        $needsProfile = false;
        if ($userFound['role'] === 'doctor') {
            // busca en $fakeDoctors
            $hasDoctorProfile = false;
            foreach ($fakeDoctors as $d) {
                if ($d['user_id'] === $userFound['id']) {
                    $hasDoctorProfile = true;
                    break;
                }
            }
            if (!$hasDoctorProfile) {
                $needsProfile = true;
            }
        }

        // Generamos un "token" falso
        $token = base64_encode('fake_jwt_token');

        return [
            "success"      => true,
            "role"         => $userFound["role"],
            "userId"       => $userFound["id"],
            "needsProfile" => $needsProfile,
            "token"        => $token
        ];
    }

    /**
     * Simula la lógica de logout.
     */
    private function simulateLogout()
    {
        // Se destruye la cookie y devuelve JSON con "Sesión cerrada"
        return ["success" => true, "message" => "Sesión cerrada"];
    }

    /**
     * Simula la lógica de getuser.php (versión mejorada):
     *  1. Verifica si existe la cookie "auth_token"
     *  2. Decodifica el token 
     *  3. Busca al usuario en una "BD" fake
     *  4. Retorna JSON análogo 
     */
    private function simulateGetUser(array $cookies)
    {
        $secret_key = "mi_clave_secreta";

        // 1) Chequeamos si existe la cookie
        if (!isset($cookies["auth_token"])) {
            return ["success" => false, "message" => "No autenticado"];
        }

        $token = $cookies["auth_token"];

        // 2) “Decodificamos” el token
        $validFakeToken = base64_encode("fake_jwt_token");
        if ($token !== $validFakeToken) {
            return [
                "success" => false,
                "message" => "Token inválido",
                "error"   => "No se pudo decodificar el token simulado"
            ];
        }

        // El token decodificado trae ->email = 'user1@example.com'
        $decodedEmail = "user1@example.com";

        // 3) "BD" en memoria
        $fakeUsers = [
            [
                'id'   => 1,
                'name' => 'Usuario Activo',
                'role' => 'doctor',
                'email'=> 'user1@example.com'
            ],
            [
                'id'   => 2,
                'name' => 'Otro Usuario',
                'role' => 'user',
                'email'=> 'user2@example.com'
            ],
        ];

        $foundUser = null;
        foreach ($fakeUsers as $u) {
            if ($u['email'] === $decodedEmail) {
                $foundUser = $u;
                break;
            }
        }

        if (!$foundUser) {
            return ["success" => false, "message" => "Usuario no encontrado"];
        }

        // 4) Retornamos la salida del endpoint
        return [
            "success" => true,
            "userId"  => $foundUser["id"],
            "name"    => $foundUser["name"],
            "role"    => $foundUser["role"]
        ];
    }

    /**
     * Simula la lógica de getdoctor.php.
     */
    private function simulateGetDoctors()
    {
        // Datos ficticios
        $fakeData = [
            [
                "id"             => 10,
                "name"           => "Dr. House",
                "especialidad"   => "Diagnóstico",
                "colegiado"      => "123456",
                "universidad"    => "Univ Ficticia",
                "graduation_date"=> "2000-05-15",
                "telefono"       => "555-1234",
                "foto_perfil"    => "house.jpg",
                "user_id"        => 1,
                "email"          => "house@example.com"
            ]
        ];

        $doctors = [];
        foreach ($fakeData as $row) {
            // simulamos "titles"
            $titles = []; // Ejemplo: ["title1.pdf", "title2.pdf"]

            $doctors[] = [
                "id"            => $row["id"],
                "name"          => $row["name"],
                "specialty"     => $row["especialidad"],
                "licenseNumber" => $row["colegiado"],
                "photo"         => $row["foto_perfil"],
                "graduation"    => [
                    "university" => $row["universidad"],
                    "year"       => date("Y", strtotime($row["graduation_date"]))
                ],
                "contact"       => [
                    "phone" => $row["telefono"],
                    "email" => $row["email"]
                ],
                "certifications" => $titles
            ];
        }
        return $doctors;
    }

    /* 
       TESTS UNITARIOS --------------------------------------------------------------
    */

    /**
     * Login exitoso
     */
    public function testLoginExitoso()
    {
        $input = ["email" => "user1@example.com", "password" => "1234"];
        $resp = $this->simulateLogin($input);

        $this->assertTrue($resp["success"]);
        $this->assertEquals("doctor", $resp["role"]);
        $this->assertEquals(1, $resp["userId"]);
        // Se espera needsProfile = true
        $this->assertTrue($resp["needsProfile"]);
        $this->assertArrayHasKey("token", $resp);
    }

    /**
     * Contraseña incorrecta
     */
    public function testLoginPasswordIncorrecto()
    {
        $input = ["email" => "user1@example.com", "password" => "xxxx"];
        $resp = $this->simulateLogin($input);

        $this->assertFalse($resp["success"]);
        $this->assertEquals("Contraseña incorrecta", $resp["message"]);
    }

    /**
     * Usuario no existe
     */
    public function testLoginUsuarioNoExiste()
    {
        $input = ["email" => "noexiste@example.com", "password" => "1234"];
        $resp = $this->simulateLogin($input);

        $this->assertFalse($resp["success"]);
        $this->assertEquals("Usuario no encontrado", $resp["message"]);
    }

    /**
     * Usuario inactivo
     */
    public function testLoginUsuarioInactivo()
    {
        $input = ["email" => "inactive@example.com", "password" => "1234"];
        $resp = $this->simulateLogin($input);

        $this->assertFalse($resp["success"]);
        $this->assertEquals("Tu cuenta aún no ha sido activada.", $resp["message"]);
    }

    /**
     * Logout
     */
    public function testLogout()
    {
        $resp = $this->simulateLogout();
        $this->assertTrue($resp["success"]);
        $this->assertEquals("Sesión cerrada", $resp["message"]);
    }

    /**
     * getUser con cookie válida
     */
    public function testGetUserExito()
    {
        // Generamos un token “válido” (simulado)
        $validToken = base64_encode("fake_jwt_token");
        // Simulamos que en "cookies" tenemos 'auth_token' => $validToken
        $cookies = ["auth_token" => $validToken];

        $resp = $this->simulateGetUser($cookies);

        $this->assertTrue($resp["success"]);
        $this->assertEquals(1, $resp["userId"]);
        $this->assertEquals("Usuario Activo", $resp["name"]);
        $this->assertEquals("doctor", $resp["role"]);
    }

    /**
     * getUser sin cookie => "No autenticado"
     */
    public function testGetUserSinCookie()
    {
        $cookies = [];
        $resp = $this->simulateGetUser($cookies);

        $this->assertFalse($resp["success"]);
        $this->assertEquals("No autenticado", $resp["message"]);
    }

    /**
     * getUser con token inválido => "Token inválido"
     */
    public function testGetUserTokenInvalido()
    {
        $cookies = ["auth_token" => "algo_raro"];
        $resp = $this->simulateGetUser($cookies);

        $this->assertFalse($resp["success"]);
        $this->assertEquals("Token inválido", $resp["message"]);
        $this->assertArrayHasKey("error", $resp);
    }

    /**
     * getDoctors
     */
    public function testGetDoctors()
    {
        $doctors = $this->simulateGetDoctors();
        $this->assertIsArray($doctors);
        $this->assertNotEmpty($doctors);

        $first = $doctors[0];
        $this->assertArrayHasKey("name", $first);
        $this->assertArrayHasKey("specialty", $first);
        $this->assertArrayHasKey("licenseNumber", $first);
        $this->assertArrayHasKey("graduation", $first);
        $this->assertArrayHasKey("contact", $first);
        $this->assertArrayHasKey("certifications", $first);
    }
}

