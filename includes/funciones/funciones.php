<?php

function obtenerContactos() {
    include 'bd.php';
    try {
        return $conn->query("SELECT id_contacto, nombre_contacto, empresa_contacto, telefono_contacto FROM contactos");
    } catch(Exception $e) {
        echo "Error!!" . $e->getMessage() . "<br>";
        return false;
    }
}

// Obtiene un contacto y toma un id

function obtenerContacto($id){
    include 'bd.php';
    try {
        return $conn->query("SELECT id_contacto, nombre_contacto, empresa_contacto, telefono_contacto FROM contactos WHERE id_contacto = $id");
    } catch(Exception $e) {
        echo "Error!!" . $e->getMessage() . "<br>";
        return false;
    }

}

?>