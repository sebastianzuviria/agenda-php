<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text" 
            placeholder="Nombre Contacto" 
            id="nombre"
            value="<?php echo ($contacto['nombre_contacto']) ? $contacto['nombre_contacto'] : ''; ?>"
            >
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" placeholder="Empresa" id="empresa" value="<?php echo ($contacto['empresa_contacto']) ? $contacto['empresa_contacto'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" placeholder="Numero de Teléfono" id="telefono" value="<?php echo ($contacto['telefono_contacto']) ? $contacto['telefono_contacto'] : ''; ?>">
    </div>

</div> <!-- Finde Campos -->
<div class="campo enviar">
    <?php
        $textoBtn = ($contacto['telefono_contacto']) ? 'Guardar' : 'Añadir';
        $accion = ($contacto['telefono_contacto']) ? 'editar' : 'crear';

    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset( $contacto['id_contacto'])) { ?>
        <input type="hidden" id="id_contacto" value="<?php echo $contacto['id_contacto']; ?>">

    <?php } ?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>