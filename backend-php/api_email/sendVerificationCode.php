<?php
// sendVerificationCode.php
// ----------------------------
// Cabeçalhos CORS
header('Access-Control-Allow-Origin: http://localhost:8100');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0); // responde preflight
}
header('Content-Type: application/json');

require 'config.php';

// lê body JSON
$body = json_decode(file_get_contents('php://input'), true);
$email = $body['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit(json_encode(['error' => 'E-mail inválido']));
}

// gera código de 6 dígitos
$code = str_pad((string) rand(0, 999999), 6, '0', STR_PAD_LEFT);
$key  = str_replace('.', '_', $email);

// salva no RTDB
curl_put("emailVerifications/{$key}", [
  'code'      => $code,
  'createdAt' => round(microtime(true) * 1000) // ms
]);

// envia por email
$subject = 'Código de Verificação — Virtual Scout';
$bodyHtml = "<p>Seu código de verificação é: <strong>{$code}</strong></p>"
          . "<p>Válido por " . (CODE_TTL_MS/60000) . " minutos.</p>";
$headers  = "From: " . FROM_EMAIL . "\r\n"
          . "Content-Type: text/html; charset=UTF-8\r\n";
mail($email, $subject, $bodyHtml, $headers);

// resposta de sucesso
echo json_encode(['ok' => true]);
