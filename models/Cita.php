<?php

namespace Model;

class Cita extends ActiveRecord
{
  protected static $tabla = 'citas';
  protected static $columnasDB = ['id', 'fecha', 'hora', 'clienteId'];

  public $id;
  public $fecha;
  public $hora;
  public $clienteId;
  public function __construct($arg = [])
  {
    $this->id = $arg['id'] ?? null;
    $this->fecha = $arg['fecha'] ?? '';
    $this->hora = $arg['hora'] ?? '';
    $this->clienteId = $arg['clienteId'] ?? '';
  }
}
