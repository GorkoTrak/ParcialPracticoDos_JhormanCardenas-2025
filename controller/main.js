//Controlador principal
//Funciones

//CRUD (Create, Read, Update, Delete)
//Función Agregar Empleado (C - Crear)
function crearEmpleado(){

	document.getElementById('divAgregarEmpleado').style.display='block';
	//alert("Entró a crear Empleado");
}

function agregarEmpleado(){
	alert ("entró a agregar empleado");

	// Cargar empleados guardados al iniciar
    document.addEventListener("DOMContentLoaded", mostrarEmpleados);

    // Manejar envío del formulario
    document.getElementById('formEmpleado').addEventListener('submit', function(e) {
      e.preventDefault();

      const empleado = new Empleado( 
        document.getElementById('cc').value,
        document.getElementById('nombresyApellidos').value,
        document.getElementById('direccion').value,
        document.getElementById('email').value,
        document.getElementById('telefono').value,
        document.getElementById('sueldoBase').value,
        document.getElementById('tipoEmpleado').value,
        document.getElementById('tipoBonificacion').value
      );

      // Obtener lista existente o crear nueva
      let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

      // Agregar nuevo empleado
      empleados.push(empleado);

      // Guardar nuevamente
      localStorage.setItem('empleados', JSON.stringify(empleados));

      // Actualizar tabla
      mostrarEmpleados();

      // Limpiar formulario
      e.target.reset();
    });

    // Mostrar empleados en tabla
    function mostrarEmpleados() {
      const tbody = document.querySelector('#tablaEmpleados tbody');
      tbody.innerHTML = '';

      const empleados = JSON.parse(localStorage.getItem('empleados')) || [];

      empleados.forEach((emp,index) => {
        const fila = `<tr>
          <td>${index + 1}</td> <!-- Aquí se genera el número autoincremento con el index del array -->
          <td>${emp.cc}</td>
          <td>${emp.nombresyApellidos}</td>
          <td>${emp.direccion}</td>
          <td>${emp.email}</td>
          <td>${emp.telefono}</td>
          <td>${emp.sueldoBase}</td>
          <td>${emp.tipoEmpleado}</td>
          <td>${emp.tipoBonificacion}</td>
        	<td><button type="button" class="btn btn-warning" data-index="${index}">Actualizar</button></td>
        	<td><button type="button" class="btn btn-danger" data-index="${index}">Eliminar</button></td>

        </tr>`;
        tbody.innerHTML += fila;
      });
    }
    
}

