<?php
include 'includes/funciones/funciones.php';
include 'includes/layout/header.php';

$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

if (!$id) {
    die('No es válido');
}

$resultado = obtenerContacto($id);

$contacto = $resultado->fetch_assoc();

?>



<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id="contacto" action="#">

        <legend>Edite el Contacto<span></span> </legend>

        <?php include 'includes/layout/formulario.php'; ?>


    </form>
</div>


<?php include 'includes/layout/footer.php'; ?>