<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

function enviarCorreo($to, $subject, $bodyHtml) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sistemahospital7@gmail.com';     // ✅ Tu correo
        $mail->Password = 'xfxd bgoz ouxz nydj';              // ✅ App Password de Gmail
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->Timeout = 10;
        $mail->SMTPKeepAlive = false;
        $mail->SMTPDebug = 2; // 🔍 Cambiá a 0 si ya no querés ver logs
        $mail->Debugoutput = 'html';

        $mail->setFrom('sistemahospital7@gmail.com', 'CliniSure');
        $mail->addAddress($to);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $bodyHtml;

        if ($mail->send()) {
            return "✅ Correo enviado exitosamente a $to";
        } else {
            return "❌ Falló el envío";
        }

    } catch (Exception $e) {
        return "❌ Error: " . $mail->ErrorInfo;
    }
}
