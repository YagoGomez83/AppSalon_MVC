<h1 class="nombre-pagina">login</h1>
<p class="descripcion-pagina">Inicia Sesión con tus datos</p>
<?php include_once __DIR__ . '/../templates/alerta.php' ?>
<form action="" class="formulario" method="post">
  <div class="campo">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="Tu Email" name="email">
  </div>
  <div class="campo">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Tu Password">
  </div>
  <input type="submit" class="boton" value="Iniciar Sesión">
</form>

<div class="acciones">
  <a href="/crear-cuenta">¡Aún no tienes una cuenta? Crear una</a>
  <a href="/olvide">¿Olvidaste tu Password?</a>
</div>