<?php
// public_html/api/api_acesso/register.php

require __DIR__ . '/../config.php';  // já inclui CORS e define funções firestorePost(), etc.

header('Content-Type: application/json');

// Lê JSON do body
$body = json_decode(file_get_contents('php://input'), true);
$type     = $body['tipoUsuario'] ?? '';
$email    = $body['email']       ?? '';
$password = $body['password']    ?? '';

// Validações básicas
if (
    !in_array($type, ['Escola','Treinador','Responsavel'], true) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    !$password
) {
    http_response_code(400);
    exit(json_encode(['error' => 'tipoUsuario, e-mail e senha são obrigatórios']));
}

// Separa dados do perfil (remove credenciais)
$dados = $body;
unset($dados['tipoUsuario'], $dados['email'], $dados['password']);

// Prepara campos para Firestore (coleção "escolas")
$timestamp = (new DateTime())->format(DateTime::RFC3339);
$fields = [
    'nome'                => ['stringValue' => $dados['nome']],
    'endereco'            => ['stringValue' => $dados['endereco']],
    'celular'             => ['stringValue' => $dados['celular']],
    'categorias'          => [
        'arrayValue' => [
            'values' => array_map(fn($v) => ['stringValue' => $v], $dados['categorias'])
        ]
    ],
    'horarioTreinoInicio' => ['stringValue' => $dados['horarioTreinoInicio']],
    'horarioTreinoFim'    => ['stringValue' => $dados['horarioTreinoFim']],
    'diasSemana'          => [
        'arrayValue' => [
            'values' => array_map(fn($d) => ['stringValue' => $d], $dados['diasSemana'])
        ]
    ],
    'fundacao'            => ['stringValue' => $dados['fundacao']],
    'meta'                => [
        'mapValue' => [
            'fields' => [
                'createdAt' => ['timestampValue' => $timestamp]
            ]
        ]
    ]
];

// 1) Cria documento em "escolas"
$resp = firestorePost('escolas', $fields);
if (!isset($resp['name'])) {
    error_log('Firestore.create(escolas) error: ' . json_encode($resp));
    http_response_code(500);
    exit(json_encode([
        'error' => 'Falha ao criar perfil Escola',
        'debug' => $resp
    ]));
}

// Extrai o ID do documento: "projects/.../documents/escolas/{docId}"
$parts = explode('/', $resp['name']);
$docId = end($parts);

// 2) Prepara e grava credenciais em "usuarios"
$salt      = bin2hex(random_bytes(8));
$senhaHash = hash('sha256', $salt . $password);
$fields2   = [
    'email'       => ['stringValue' => $email],
    'salt'        => ['stringValue' => $salt],
    'senhaHash'   => ['stringValue' => $senhaHash],
    'tipoUsuario' => ['stringValue' => $type],
    'entidadeId'  => ['stringValue' => $docId]
];

$resp2 = firestorePost('usuarios', $fields2);
if (!isset($resp2['name'])) {
    error_log('Firestore.create(usuarios) error: ' . json_encode($resp2));
    http_response_code(500);
    exit(json_encode([
        'error' => 'Falha ao gravar credenciais',
        'debug' => $resp2
    ]));
}

// Tudo certo
echo json_encode([
    'ok'         => true,
    'entidadeId' => $docId
]);
