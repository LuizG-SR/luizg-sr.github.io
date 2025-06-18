<?php
// public_html/api/api_acesso/login.php

// Inclui CORS, headers e helpers do Firestore REST
require __DIR__ . '/../config.php';

header('Content-Type: application/json');

// Lê e valida o corpo da requisição
$body     = json_decode(file_get_contents('php://input'), true);
$email    = $body['email']    ?? '';
$password = $body['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !$password) {
    http_response_code(400);
    exit(json_encode(['error' => 'E-mail e senha são obrigatórios']));
}

// Executa a query no Firestore para encontrar o usuário por e-mail
$rows = firestoreRunQuery('usuarios', 'email', $email);
if (!is_array($rows)) {
    error_log('Firestore.runQuery(usuarios) error: ' . json_encode($rows));
    http_response_code(500);
    exit(json_encode(['error' => 'Erro interno no servidor', 'debug' => $rows]));
}

// Busca o primeiro documento retornado
$userDoc = null;
foreach ($rows as $row) {
    if (isset($row['document'])) {
        $userDoc = $row['document'];
        break;
    }
}

if (!$userDoc) {
    http_response_code(400);
    exit(json_encode(['error' => 'Usuário não encontrado']));
}

// Extrai os campos do documento
$fields      = $userDoc['fields'] ?? [];
$salt        = $fields['salt']['stringValue']     ?? null;
$hashStored  = $fields['senhaHash']['stringValue'] ?? null;
$entidadeId  = $fields['entidadeId']['stringValue'] ?? null;

if (!$salt || !$hashStored) {
    error_log('Credenciais incompletas: ' . json_encode($fields));
    http_response_code(500);
    exit(json_encode(['error' => 'Dados de credenciais inválidos']));
}

// Verifica o hash da senha
$testHash = hash('sha256', $salt . $password);
if ($testHash !== $hashStored) {
    http_response_code(400);
    exit(json_encode(['error' => 'Senha inválida']));
}

if (!$entidadeId) {
    error_log('EntidadeId ausente em usuários: ' . json_encode($fields));
    http_response_code(500);
    exit(json_encode(['error' => 'ID de usuário não encontrado']));
}

// Autenticação bem-sucedida
echo json_encode([
    'ok'         => true,
    'entidadeId' => $entidadeId
]);
