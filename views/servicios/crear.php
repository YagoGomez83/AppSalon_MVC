<h1 class="nombre-pagina">Nuevo Servicio</h1>
<p class="descripcion-pagina">Llena todos los campos para añadir un nuevo servicio</p>
<?php
include_once __DIR__ . '/../templates/barra.php';
?>
<?php include_once __DIR__ . '/../templates/alerta.php'; ?>
<form action="/servicios/crear" class="formulario" method="post">

  <?php include_once __DIR__ . '/formulario.php'; ?>
  <input type="submit" class="boton" value="Guardar Servicio">
</form>