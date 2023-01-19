<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nuevo password a continuación</p>
<?php include_once __DIR__ . '/../templates/alerta.php' ?>

<?php if ($error) : return;
endif; ?>
<form class="formulario" method="post">
  <div class="campo">
    <label for="password">Password</label>
    <input type="password" id='password' name='password' placeholder="Tu nuevo Password">
  </div>
  <input type="submit" class="boton" value="Guarda tu nuevo password">
</form>
<div class="acciones">
  <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
  <a href="/crear-cuenta">¡Aún no tienes una cuenta? Crear una</a>
</div>