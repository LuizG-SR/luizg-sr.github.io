<?php
// public_html/api/verifyEmailCode.php
header('Content-Type: application/json');
require 'config.php';

$body = json_decode(file_get_contents('php://input'), true);
$email = $body['email'] ?? '';
$code  = $body['code']  ?? '';

if (!$email || !$code) {
  http_response_code(400);
  exit(json_encode(['error'=>'E-mail e código são obrigatórios']));
}

$key  = str_replace('.', '_', $email);
$data = curl_get("emailVerifications/{$key}");

if (empty($data)) {
  http_response_code(400);
  exit(json_encode(['error'=>'Código não encontrado']));
}
if (round(microtime(true)*1000) - $data['createdAt'] > CODE_TTL_MS) {
  http_response_code(400);
  exit(json_encode(['error'=>'Código expirado']));
}
if ($data['code'] !== $code) {
  http_response_code(400);
  exit(json_encode(['error'=>'Código inválido']));
}

// opcional: remover registro
curl_put("emailVerifications/{$key}", null);

echo json_encode(['ok'=>true]);
