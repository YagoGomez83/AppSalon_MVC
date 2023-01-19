<?php

namespace Controllers;

use Model\AdminCita;
use MVC\Router;

class AdminController
{
  public static function index(Router $router)
  {

    isAdmin();
    $fecha = $_GET['fecha'] ?? date('Y-m-d');
    $fechas = explode('-', $fecha);
    if (!checkdate($fechas[1], $fechas[2], $fechas[0])) {
      header('location: /404');
    }



    //consultar la base de datos
    $consulta = "SELECT citas.id, citas.hora, CONCAT( usuarios.nombre, ' ', usuarios.apellido) as cliente, ";
    $consulta .= " usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio  ";
    $consulta .= " FROM citas  ";
    $consulta .= " LEFT OUTER JOIN usuarios ";
    $consulta .= " ON citas.clienteId=usuarios.id  ";
    $consulta .= " LEFT OUTER JOIN citasservicios ";
    $consulta .= " ON citasServicios.citasID=citas.id ";
    $consulta .= " LEFT OUTER JOIN servicios ";
    $consulta .= " ON servicios.id=citasservicios.serviciosId ";
    $consulta .= " WHERE fecha =  '{$fecha}' ";
    $citas = AdminCita::SQL($consulta);
    $idCita = 0;
    $router->render('admin/index', [
      'nombre' => $_SESSION['nombre'],
      'citas' => $citas,
      'idCita' => $idCita,
      'fecha' => $fecha
    ]);
  }
}
