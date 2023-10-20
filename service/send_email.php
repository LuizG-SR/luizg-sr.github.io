<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $nome = strip_tags(trim($_POST['nome'])); // remove tags HTML e espaços em branco
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL); // valida e higieniza o e-mail
    $escola = strip_tags(trim($_POST['escola'])); 
    $mensagem = strip_tags(trim($_POST['mensagem'])); 

    // Define o destinatário do e-mail e o assunto
    $destinatario = "contato@virtualscout.com.br"; // substitua pelo seu e-mail
    $assunto = "Nova mensagem do site Virtual Scout";

    // Constrói o corpo do e-mail
    $conteudo_email = "<html>";
    $conteudo_email .= "<body>";
    $conteudo_email .= "<h2>Nova Mensagem de Contato - Virtual Scout</h2>";
    $conteudo_email .= "<p><strong>Nome:</strong> {$nome}</p>";
    $conteudo_email .= "<p><strong>E-mail:</strong> {$email}</p>";
    $conteudo_email .= "<p><strong>Escola:</strong> {$escola}</p>";
    $conteudo_email .= "<p><strong>Mensagem:</strong></p>";
    $conteudo_email .= "<p>{$mensagem}</p>";
    $conteudo_email .= "</body>";
    $conteudo_email .= "</html>";

    // Define o cabeçalho para o e-mail, incluindo MIME version e Content-type
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $nome <$email>" . "\r\n";

    // Envia o e-mail e verifica o sucesso
    if (mail($destinatario, $assunto, $conteudo_email, $headers)) {
        echo "E-mail enviado com sucesso!";
    } else {
        echo "Erro ao enviar o e-mail.";
    }
}
?>
