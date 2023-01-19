<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>
<?php include_once __DIR__ . '/../templates/alerta.php' ?>

<form action="" class="formulario" method="post">
  <div class="campo">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" placeholder="TU Nombre" value="<?php echo s($usuario->nombre) ?>">
  </div>
  <div class="campo">
    <label for="apellido">Apellido:</label>
    <input type="text" id="apellido" name="apellido" placeholder="TU Apellido" value="<?php echo s($usuario->apellido) ?>">

  </div>
  <div class="campo">
    <label for="telefono">Teléfono:</label>
    <input type="tel" id="telefono" name="telefono" placeholder="TU Telefono" value="<?php echo s($usuario->telefono) ?>">

  </div>
  <div class="campo">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" placeholder="TU Email" value="<?php echo s($usuario->email) ?>">

  </div>

  <div class="campo">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" placeholder="TU Password">

  </div>
  <input type="submit" value="Crear Cuenta" class="boton">
</form>
<div class="acciones">
  <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
  <a href="/olvide">¿Olvidaste tu Password?</a>
</div>