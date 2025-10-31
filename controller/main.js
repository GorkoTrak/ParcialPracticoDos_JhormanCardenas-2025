//Controlador principal
//Funciones

//CRUD (Create, Read, Update, Delete)
//Función Agregar Empleado (C - Crear)
function crearEmpleado(){ 

	document.getElementById('divAgregarEmpleado').style.display='block';
	//alert("Entró a crear Empleado");
}

function agregarEmpleado() {
  alert("Entró a agregar empleado");

  document.addEventListener("DOMContentLoaded", () => {
    mostrarEmpleados();
    mostrarSaldoTotal();
  });

  document.getElementById("formEmpleado").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    const cc = document.getElementById("cc").value;
    const nombresyApellidos = document.getElementById("nombresyApellidos").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const sueldoBase = parseFloat(document.getElementById("sueldoBase").value);
    const tipoEmpleado = document.getElementById("tipoEmpleado").value;
    const tipoBonificacion = document.getElementById("tipoBonificacion").value;

    // Calcular salario total
    const salarioTotal = calcularSalarioTotal(sueldoBase, tipoBonificacion);

    // Crear objeto empleado
    const empleado = {
      cc,
      nombresyApellidos,
      direccion,
      email,
      telefono,
      sueldoBase,
      tipoEmpleado,
      tipoBonificacion,
      salarioTotal,
    };

    // Guardar empleado en localStorage
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    empleados.push(empleado);
    localStorage.setItem("empleados", JSON.stringify(empleados));

    // Actualizar tabla y total
    mostrarEmpleados();
    mostrarSaldoTotal();

    // Limpiar formulario
    e.target.reset();
  });
}

function mostrarEmpleados() {
  const tbody = document.querySelector("#tablaEmpleados tbody");
  tbody.innerHTML = "";

  const empleados = JSON.parse(localStorage.getItem("empleados")) || [];

  empleados.forEach((emp, index) => {
    const fila = `
      <tr>
        <td>${index + 1}</td>
        <td>${emp.cc}</td>
        <td>${emp.nombresyApellidos}</td>
        <td>${emp.direccion}</td>
        <td>${emp.email}</td>
        <td>${emp.telefono}</td>
        <td>${emp.sueldoBase}</td>
        <td>${emp.tipoEmpleado}</td>
        <td>${emp.tipoBonificacion}</td>
        <td>${emp.salarioTotal}</td>
      </tr>`;
    tbody.innerHTML += fila;
  });
}

function calcularSumaTotalSalarios() {
  const empleados = JSON.parse(localStorage.getItem("empleados")) || [];
  let suma = 0;

  empleados.forEach(emp => {
    suma += emp.salarioTotal || 0;
  });

  return suma;
}

function calcularSalarioTotal(sueldoBase, tipoBonificacion) {
  let bonificacion = 0;

  switch (tipoBonificacion) {
    case "A":
      bonificacion = 200000;
      break;
    case "B":
      bonificacion = 150000;
      break;
    case "C":
      bonificacion = 100000;
      break;
    case "D":
      bonificacion = 50000;
      break;
    default:
      bonificacion = 0;
      break;
  }

  return sueldoBase + bonificacion;
}

function mostrarSaldoTotal() {
  const total = calcularSumaTotalSalarios();
  const textoTotal = document.getElementById("saldoTotalTexto");

  if (textoTotal) {
    textoTotal.textContent = `Saldo Nómina: $${total.toLocaleString("es-CO")}`;
  }
}


