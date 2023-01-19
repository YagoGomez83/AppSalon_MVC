<?php

namespace Model;

class CitaServicio extends ActiveRecord
{
  protected static  $tabla = 'citasservicios';
  protected static $columnasDB = ['id', 'citasID', 'serviciosId'];
  public $id;
  public $citasID;
  public $serviciosId;

  public function __construct($args = [])
  {
    $this->id = $args['id'] ?? null;
    $this->citasID = $args['citasID'] ?? null;
    $this->serviciosId = $args['serviciosId'] ?? null;
  }
}
