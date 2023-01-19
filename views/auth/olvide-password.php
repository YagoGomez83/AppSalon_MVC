<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Restablece tu password escribiendo tu Email a continuación</p>
<?php include_once __DIR__ . '/../templates/alerta.php' ?>
<form action="" class="formulario" method="post">
  <div class="campo">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="Tu Email">
  </div>
  <input type="submit" class="boton" value="Enviar instrucciones">
</form>
<div class="acciones">
  <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
  <a href="/crear-cuenta">¡Aún no tienes una cuenta? Crear una</a>
</div>