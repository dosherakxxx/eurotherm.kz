<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "sales@eurotherm.kz"; // Укажи свою почту Яндекс 360
    $subject = "Новая заявка с сайта";

    $name = htmlspecialchars($_POST["name"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    $email_message = "Имя: $name\n";
    $email_message .= "Телефон: $phone\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Сообщение:\n$message\n";

    $headers = "From: homevent.kz\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    if (mail($to, $subject, $email_message, $headers)) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке.";
    }
}
?>
