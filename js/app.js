const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
    
    //Listener para eliminar el contacto
    if(listadoContactos){
    listadoContactos.addEventListener('click', eliminarContacto);
    }

    //buscador
    inputBuscador.addEventListener('input', buscarContactos);

    numeroContactos();

}


function leerFormulario(e) {
    e.preventDefault();

    //Leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;


    if (nombre === '' || empresa === '' || telefono === '') {

        // 2 parametros texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
       //pasa la validacion, crea el llamado a Ajax
       const infoContacto = new FormData();
       infoContacto.append('nombre', nombre);
       infoContacto.append('empresa', empresa);
       infoContacto.append('telefono', telefono);
       infoContacto.append('accion', accion);



       if(accion === 'crear'){
           // crear nuevo contacto
            insertarBD(infoContacto);

       } else {
           // editar contacto
           //Leer el Id
           const idRegistro = document.querySelector('#id_contacto').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
       }
    }
}

// Insertar en la base de datos via Ajax

function insertarBD(infoContacto) {
    // Llamado a Ajax

    // Crear el objeto
    const xhr = new XMLHttpRequest();
    // Abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);
    // Pasar los datos
    xhr.onload = function() {
        if(this.status === 200)
            //console.log(JSON.parse(xhr.responseText));
            // Leemos respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);
            
            //inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            // crear contenedor para los botones

            const contenedorAcciones = document.createElement('td');

            //Crear icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //crea el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            //agregando al padre
            contenedorAcciones.appendChild(btnEditar);

            // crear el icono de eliminar
            const iconoEliminar= document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //crear el boton de elminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            //agregando al padre
            contenedorAcciones.appendChild(btnEliminar);

            //agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            //agredando al tbody
            listadoContactos.appendChild(nuevoContacto);

            //Resetar el formulario
            document.querySelector('form').reset();

            //Mostrar la notificacion

            mostrarNotificacion('Contacto Creado Correctamente', 'correcto');

            //Actualizar numero
            numeroContactos();

    }
    // Enviar los datos
    xhr.send(infoContacto);
}

// Actualizar registro

function actualizarRegistro(datos) {
    // crear el objeto
    const xhr = new XMLHttpRequest();
    // abrir la conexion
    xhr.open('POST', 'includes/modelos/modelo-contacto.php', true);
    // leer la respuesta
    xhr.onload = function() {
        if(this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);
            //console.log(respuesta);
            if(respuesta.respuesta === 'correcto'){
                //mostrar notificacion de correcto
                mostrarNotificacion('Contacto editado correctamente', 'correcto');
            } else {
                //mostrar notificacion de error
                mostrarNotificacion('Hubo un error', 'error');
            }
            // Despues de tres segundos redireccionar
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 3500);

        }
    }
    //enviar la peticion
    xhr.send(datos);
}

//Eliminar el contacto

function eliminarContacto(e) {
    if(e.target.parentElement.classList.contains('btn-borrar')) {
        //Tomar id del elemento
        const id = e.target.parentElement.getAttribute('data-id');
        //console.log(id);
        //Preguntar al usuario si esta seguro
        const respuesta = confirm('¿Está seguro de que desea eliminar este contacto?');
        if(respuesta) {
           // console.log('Si estoy seguro');
           // Hacer llamado a AJAx
           // Crear el objeto
            const xhr = new XMLHttpRequest();
           // Abrir la conexion
            xhr.open('GET', `includes/modelos/modelo-contacto.php?id=${id}&accion=borrar`, true);
           // Leer la respuesta
            xhr.onload = function() {
                if(this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    //console.log(resultado);

                    if(resultado.respuesta == 'correcto'){
                        // Eliminar el registro del DOM
                        //console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();
                        //mostrar Notificacion
                        mostrarNotificacion('Contacto Eliminado', 'correcto');
                        
                        //Actualizar numero
                        numeroContactos();

                    } else {
                        // Mostramos una notificacion
                        mostrarNotificacion('Hubo un error', 'error');
                    }
                }

            }
           // Enviar la peticion
           xhr.send();

        } else {
            // console.log('No quiero eliminarlo');
        }
    }
}

// Notificacion en pantalla 

function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    // Formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    // Oculatar y mostrar la notificacion

    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}

// Buscar contactos

function buscarContactos(e) {
    //console.log(e.target.value);
    const expresion = new RegExp(e.target.value, "i"), // la i es key insensitive, no distingue mayusculas de minusculas
          registros = document.querySelectorAll('tbody tr');

        registros.forEach(registro => {
            registro.style.display = 'none';

            if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){ // los nombres estan en la posicion 1
                registro.style.display = 'table-row';
            }
        
        numeroContactos();

        });

}

// Muestra el numero de contatos

function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
          contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto =>{
        if(contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    });

    contenedorNumero.textContent = total;
}