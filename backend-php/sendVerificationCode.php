<?php
// public_html/api/sendVerificationCode.php
header('Content-Type: application/json');
require 'config.php';

$body = json_decode(file_get_contents('php://input'), true);
$email = $body['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit(json_encode(['error'=>'E-mail inválido']));
}

// gera código 6 dígitos
$code = str_pad(strval(rand(0,999999)), 6, '0', STR_PAD_LEFT);
$key  = str_replace('.', '_', $email);

// grava no RTDB
curl_put("emailVerifications/{$key}", [
  'code'      => $code,
  'createdAt' => round(microtime(true)*1000)
]);

// envia e-mail
$subject = 'Código de Verificação — Virtual Scout';
$body    = "Seu código de verificação é <strong>{$code}</strong> e vale por 10 min.";
$headers = "From: “Virtual Scout” <" . FROM_EMAIL . ">\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
mail($email, $subject, $body, $headers);

echo json_encode(['ok'=>true]);
