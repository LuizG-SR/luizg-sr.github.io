<?php
// public_html/api/config.php

// Firebase Realtime Database (REST)
const FIREBASE_URL    = 'https://virtualscout-app-default-rtdb.firebaseio.com';
const FIREBASE_SECRET = 'SEU_DATABASE_SECRET_DO_RTDB'; // Legacy secret em Configurações > Realtime DB

// SMTP Hostinger
const SMTP_HOST  = 'smtp.hostinger.com';
const SMTP_PORT  = 465;
const SMTP_USER  = 'no-reply@virtualscout.com.br';
const SMTP_PASS  = 'VirtualScoutNoReply!785612';
const FROM_EMAIL = 'no-reply@virtualscout.com.br';

// TTL do código (ms)
const CODE_TTL_MS = 10 * 60 * 1000;

function curl_put($path, $data) {
  $url = FIREBASE_URL . '/' . $path . '.json?auth=' . FIREBASE_SECRET;
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
  curl_setopt($ch, CURLOPT_POSTFIELDS,    json_encode($data));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $res = curl_exec($ch);
  curl_close($ch);
  return $res;
}

function curl_get($path) {
  $url = FIREBASE_URL . '/' . $path . '.json?auth=' . FIREBASE_SECRET;
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $res = curl_exec($ch);
  curl_close($ch);
  return json_decode($res, true);
}
