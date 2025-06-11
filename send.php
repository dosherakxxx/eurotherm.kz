<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Подключение PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "sales@eurotherm.kz";
    $subject = "Новая заявка с сайта";

    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $email_message = "Имя: $name\n";
    $email_message .= "Телефон: $phone\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Сообщение:\n$message\n";

    $mail = new PHPMailer(true);

    try {
        // Настройки SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru'; // или smtp.gmail.com, smtp.mail.ru и т.д.
        $mail->SMTPAuth = true;
        $mail->Username = 'sales@eurotherm.kz'; // ваш email
        $mail->Password = 'udnerukpbhikwaoo'; // пароль приложения или почты
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->setFrom('sales@eurotherm.kz', 'Eurotherm.kz');
        $mail->addAddress($to);

        $mail->addReplyTo($email, $name);

        $mail->CharSet = 'UTF-8';
        $mail->Subject = $subject;
        $mail->Body = $email_message;

        $mail->send();
        echo "OK";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Ошибка при отправке: {$mail->ErrorInfo}";
    }
}
?>
