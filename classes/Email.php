<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
  public $email;
  public $nombre;
  public $token;

  public function __construct($email, $nombre, $token)
  {
    $this->email = $email;
    $this->nombre = $nombre;
    $this->token = $token;
  }

  public function enviarConfirmacion()
  {
    $phpmailer = new PHPMailer();
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.mailtrap.io';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 2525;
    $phpmailer->Username = 'a24a0c9f1b8b04';
    $phpmailer->Password = '73e32ef196052e';
    $phpmailer->setFrom('cuentas@appsalon.com');
    $phpmailer->addAddress('cuentas@appsalon.com', 'AppSalon.com');
    $phpmailer->Subject = 'Confirma tu cuenta';

    //set HTML
    $phpmailer->isHTML(true);
    $phpmailer->CharSet = 'UTF-8';
    $contenido = "<html>";
    $contenido .= "<p><strong>Hola " . $this->nombre .  "</strong> Has creado tu cuenta en App Salon, solo debes de confirmarla presiendo el siguiente enlace</p>";
    $contenido .= "<p>Presiona aquí: <a href='http://localhost:8081/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
    $contenido .= "<p>Si tu no solicitaste esta cuenta, ignora el mensaje</p>";
    $contenido .= "</html>";
    $phpmailer->Body = $contenido;

    //enviar el email
    $phpmailer->send();
  }
  public function enviarInstrucciones()
  {
    $phpmailer = new PHPMailer();
    $phpmailer->isSMTP();
    $phpmailer->Host = 'smtp.mailtrap.io';
    $phpmailer->SMTPAuth = true;
    $phpmailer->Port = 2525;
    $phpmailer->Username = 'a24a0c9f1b8b04';
    $phpmailer->Password = '73e32ef196052e';
    $phpmailer->setFrom('cuentas@appsalon.com');
    $phpmailer->addAddress('cuentas@appsalon.com', 'AppSalon.com');
    $phpmailer->Subject = 'Restablece tu password';

    //set HTML
    $phpmailer->isHTML(true);
    $phpmailer->CharSet = 'UTF-8';
    $contenido = "<html>";
    $contenido .= "<p><strong>Hola " . $this->nombre .  "</strong> Has Solicitado restablecer tu password, sigue el siguiente enlace</p>";
    $contenido .= "<p>Presiona aquí: <a href='http://localhost:8081/recuperar?token=" . $this->token . "'>Recuperar Password</a></p>";
    $contenido .= "<p>Si tu no solicitaste esta cuenta, ignora el mensaje</p>";
    $contenido .= "</html>";
    $phpmailer->Body = $contenido;

    //enviar el email
    $phpmailer->send();
  }
}
