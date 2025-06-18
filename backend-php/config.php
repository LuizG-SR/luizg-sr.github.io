<?php
// config.php — CORS + Firestore REST

// ——— CORS ———————————————————————————————
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

// ——— Credenciais Firestore ——————————————————
const FIRESTORE_PROJECT = 'virtualscout-app';
const FIRESTORE_KEY     = 'YOUR_FIREBASE_WEB_API_KEY';

// faz POST JSON e retorna array
function postRequest(string $url, array $body): array {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $res = curl_exec($ch);
  curl_close($ch);
  return json_decode((string)$res, true) ?? [];
}

/**
 * Cria um documento em uma coleção Firestore
 * @param string $collection ex: 'escolas' ou 'usuarios'
 * @param array  $fields     mapeado em formato Firestore
 * @return array resposta JSON (contém 'name' com o path completo)
 */
function firestorePost(string $collection, array $fields): array {
  $url = "https://firestore.googleapis.com/v1/projects/"
       . FIRESTORE_PROJECT
       . "/databases/(default)/documents/{$collection}"
       . "?key=" . FIRESTORE_KEY;
  return postRequest($url, ['fields' => $fields]);
}

/**
 * Executa um runQuery para buscar um único doc por campo
 * @return array lista de objetos { document: { name, fields, ... } }
 */
function firestoreRunQuery(string $collection, string $fieldPath, string $value): array {
  $url = "https://firestore.googleapis.com/v1/projects/"
       . FIRESTORE_PROJECT
       . "/databases/(default)/documents:runQuery"
       . "?key=" . FIRESTORE_KEY;

  $body = [
    'structuredQuery' => [
      'from' => [['collectionId' => $collection]],
      'where' => [
        'fieldFilter' => [
          'field' => ['fieldPath' => $fieldPath],
          'op'    => 'EQUAL',
          'value' => ['stringValue' => $value]
        ]
      ],
      'limit' => 1
    ]
  ];

  return postRequest($url, $body);
}
