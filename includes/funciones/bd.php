<?php

// Credenciales de la base de datos
define('BD_USUARIO', 'root');
define('BD_PASSWORD', 'root');
define('BD_HOST', '127.0.0.1');
define('BD_NOMBRE', 'agendaphp');

$conn = new mysqli(BD_HOST, BD_USUARIO, BD_PASSWORD, BD_NOMBRE);

?>