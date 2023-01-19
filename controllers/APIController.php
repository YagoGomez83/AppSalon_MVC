<?php

namespace Controllers;

use Model\Cita;
use MVC\Router;
use Model\Servicio;
use Model\CitaServicio;

class APIController
{
  public static function index()
  {
    $servicios = Servicio::all();
    echo json_encode($servicios);
  }
  public static function guardar()
  {
    //almacena la Cita y devuelve el ID
    $cita = new Cita($_POST);
    $resultado = $cita->guardar();

    $id = intval($resultado['id']);

    //Almacena las citas y los servicios
    $idServicios = explode(',', $_POST['servicios']);
    foreach ($idServicios as $idservicio) {
      $args = [
        'citasID' => $id,
        'serviciosId' => $idservicio
      ];
      $citaServicio = new CitaServicio($args);
      $citaServicio->guardar();
    }
    //retornamos una respuesta

    echo json_encode(['resultado' => $resultado]);
  }
  public static function eliminar(Router $router)
  {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $id = $_POST['id'];
      $cita = Cita::find($id);
      $cita->eliminar();
      header('Location:' . $_SERVER['HTTP_REFERER']);
    }
  }
}
