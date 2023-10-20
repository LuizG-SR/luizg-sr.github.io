<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta de dados do formulário
    $nome = strip_tags(trim($_POST['nome'])); // remove tags HTML e espaços em branco desnecessários
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL); // remove caracteres ilegais
    $escola = strip_tags(trim($_POST['escola']));
    $mensagem = strip_tags(trim($_POST['mensagem']));

    // Configurar para quem será enviado o e-mail
    $destinatario = "contato@virtualscout.com"; // substitua pelo seu e-mail

    // Assunto do e-mail
    $assunto = "Nova mensagem do site Virtual Scout";

    // Construir o corpo do e-mail em HTML
    $conteudo_email = "<html><body>";
    $conteudo_email .= "<h1>Nova mensagem de Virtual Scout</h1>";
    $conteudo_email .= "<p><strong>Nome:</strong> {$nome}</p>";
    $conteudo_email .= "<p><strong>E-mail:</strong> {$email}</p>";
    $conteudo_email .= "<p><strong>Escola:</strong> {$escola}</p>";
    $conteudo_email .= "<p><strong>Mensagem:</strong><br>" . nl2br($mensagem) . "</p>"; // nl2br para manter quebras de linha
    $conteudo_email .= "</body></html>";

    // Configurar cabeçalhos para o e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: {$nome} <{$email}>" . "\r\n";

    // Verificar se o e-mail é válido
    if (!filter_var($email,
