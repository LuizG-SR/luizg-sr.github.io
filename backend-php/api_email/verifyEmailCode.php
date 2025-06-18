<?php
// verifyEmailCode.php

// —— CORS ——
// Ajuste a origem conforme o seu front (pode usar '*' se preferir)
header('Access-Control-Allow-Origin: http://localhost:8100');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}

header('Content-Type: application/json');

// carrega configurações
require 'config.php';

// lê o JSON do body
$body = json_decode(file_get_contents('php://input'), true);
$email = $body['email'] ?? '';
$code  = $body['code']  ?? '';

// valida presença
if (!$email || !$code) {
  http_response_code(400);
  exit(json_encode(['error' => 'E-mail e código são obrigatórios']));
}

// busca no RTDB
$key  = str_replace('.', '_', $email);
$data = curl_get("emailVerifications/{$key}");

// se não encontrou nada
if (empty($data) || !isset($data['createdAt'])) {
  http_response_code(400);
  exit(json_encode(['error' => 'Código não encontrado', 'debug'=>$data]));
}

// pega createdAt bruto
$raw = $data['createdAt'];

// converte para ms se vier em segundos
if ($raw < 1000000000000) {
  $createdAt = $raw * 1000;
  $unit = 'seconds->ms';
} else {
  $createdAt = $raw;
  $unit = 'ms';
}

// calcula agora e diff
$now  = round(microtime(true) * 1000);
$diff = $now - $createdAt;

// monta debug
$debug = [
  'now_ms'            => $now,
  'raw_createdAt'     => $raw,
  'createdAt_ms'      => $createdAt,
  'unit_used'         => $unit,
  'diff_ms'           => $diff,
  'TTL_ms'            => CODE_TTL_MS
];

// checa expirado
if ($diff > CODE_TTL_MS) {
  http_response_code(400);
  exit(json_encode(['error' => 'Código expirado', 'debug' => $debug]));
}

// checa valor
if ($data['code'] !== $code) {
  http_response_code(400);
  exit(json_encode(['error' => 'Código inválido', 'debug' => $debug]));
}

// opcionalmente remova o registro
curl_put("emailVerifications/{$key}", null);

// retorna OK + debug (você pode remover debug depois)
echo json_encode(['ok' => true, 'debug' => $debug]);
