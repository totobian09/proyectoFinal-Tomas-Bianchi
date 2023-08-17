// Array de objetos para almacenar la información de los estudiantes
let estudiantes = [];

// Obtener elementos del DOM
const formulario = document.getElementById("formulario");
const nombreEstudianteInput = document.getElementById("nombreEstudiante");
const notaEstudianteInput = document.getElementById("notaEstudiante");
const agregarEstudianteBtn = document.getElementById("agregarEstudiante");
const limpiarListaBtn = document.getElementById("limpiarLista");
const calcularResultadosBtn = document.getElementById("calcularResultados");
const eliminarUltimoEstudianteBtn = document.getElementById("eliminarUltimoEstudiante");
const eliminarListaCompletaBtn = document.getElementById("eliminarListaCompleta");
const resultadosDiv = document.getElementById("resultados");
const estudiantesIngresadosOl = document.getElementById("estudiantesIngresados");

// Evento click del botón "Agregar Estudiante"
agregarEstudianteBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Obtener nombre y nota del estudiante del formulario
  const nombreEstudiante = nombreEstudianteInput.value;
  const notaEstudiante = parseFloat(notaEstudianteInput.value);

  // Validar la nota ingresada
  if (notaEstudiante < 0 || notaEstudiante > 10 || isNaN(notaEstudiante)) {
    mostrarMensajeError("Ingrese un número válido entre 0 y 10.", notaEstudianteInput);
    return;
  }

  // Validar el nombre ingresado
  if (!nombreEstudiante.match(/^[A-Za-z\s]+$/)) {
    mostrarMensajeError("Ingrese un nombre válido (solo letras y espacios).", nombreEstudianteInput);
    return;
  }

  // Crear objeto estudiante y agregarlo al array de estudiantes
  const estudiante = {
    nombre: nombreEstudiante,
    nota: notaEstudiante
  };
  estudiantes.push(estudiante);

  // Mostrar el estudiante ingresado en la lista de estudiantes
  const nuevoEstudianteLi = document.createElement("li");
  nuevoEstudianteLi.textContent = `${nombreEstudiante}: ${notaEstudiante}`;
  estudiantesIngresadosOl.appendChild(nuevoEstudianteLi);

  // Limpiar campos del formulario
  nombreEstudianteInput.value = "";
  notaEstudianteInput.value = "";

  // Guardar la lista de estudiantes en el almacenamiento local
  guardarListaEstudiantes();

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Evento click del botón "Limpiar Lista"
limpiarListaBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Reiniciar el array de estudiantes y vaciar la lista de estudiantes ingresados
  estudiantes = [];
  estudiantesIngresadosOl.innerHTML = "";

  // Limpiar campos del formulario
  nombreEstudianteInput.value = "";
  notaEstudianteInput.value = "";

  // Limpiar los resultados
  resultadosDiv.innerHTML = "";

  // Guardar la lista de estudiantes en el almacenamiento local
  guardarListaEstudiantes();

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Evento click del botón "Calcular Resultados"
calcularResultadosBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si se ha ingresado al menos un estudiante
  if (estudiantes.length === 0) {
    mostrarMensajeError("No se ha ingresado ningún estudiante.");
    return;
  }

  // Calcular los resultados
  const promedioGeneral = calcularPromedioGeneral();
  const porcentajeDesaprobados = calcularPorcentajeDesaprobados();
  const porcentajeAprobados = calcularPorcentajeAprobados();
  const porcentajePromocionados = calcularPorcentajePromocionados();

  // Mostrar los resultados en el elemento resultadosDiv
  resultadosDiv.innerHTML = `
    <p>Promedio general: ${promedioGeneral.toFixed(2)}</p>
    <p>Porcentaje de desaprobados: ${porcentajeDesaprobados.toFixed(2)}%</p>
    <p>Porcentaje de aprobados: ${porcentajeAprobados.toFixed(2)}%</p>
    <p>Porcentaje de promocionados: ${porcentajePromocionados.toFixed(2)}%</p>
  `;
});

// Evento click del botón "Eliminar Último Estudiante"
eliminarUltimoEstudianteBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si hay estudiantes para eliminar
  if (estudiantes.length === 0) {
    mostrarMensajeError("No hay estudiantes para eliminar.");
    return;
  }

  // Eliminar el último estudiante ingresado
  estudiantes.pop();

  // Eliminar el último <li> de la lista de estudiantes ingresados
  estudiantesIngresadosOl.removeChild(estudiantesIngresadosOl.lastChild);

  // Guardar la lista de estudiantes en el almacenamiento local
  guardarListaEstudiantes();

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Evento click del botón "Eliminar Lista Completa"
eliminarListaCompletaBtn.addEventListener("click", function(event) {
  event.preventDefault();

  // Verificar si hay estudiantes para eliminar
  if (estudiantes.length === 0) {
    mostrarMensajeError("No hay estudiantes para eliminar.");
    return;
  }

  // Reiniciar el array de estudiantes y vaciar la lista de estudiantes ingresados
  estudiantes = [];
  estudiantesIngresadosOl.innerHTML = "";

  // Limpiar campos del formulario
  nombreEstudianteInput.value = "";
  notaEstudianteInput.value = "";

  // Limpiar los resultados
  resultadosDiv.innerHTML = "";

  // Eliminar la lista de estudiantes guardada en el almacenamiento local
  localStorage.removeItem("estudiantes");

  // Mostrar los arrays en la consola
  console.log("Estudiantes:", estudiantes);
});

// Función para calcular el promedio general
function calcularPromedioGeneral() {
  let total = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    total += estudiantes[i].nota;
  }
  return total / estudiantes.length;
}

// Función para calcular el porcentaje de desaprobados
function calcularPorcentajeDesaprobados() {
  let contadorDesaprobados = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].nota < 4) {
      contadorDesaprobados++;
    }
  }
  return (contadorDesaprobados / estudiantes.length) * 100;
}

// Función para calcular el porcentaje de aprobados
function calcularPorcentajeAprobados() {
  let contadorAprobados = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].nota >= 4 && estudiantes[i].nota <= 10) {
      contadorAprobados++;
    }
  }
  return (contadorAprobados / estudiantes.length) * 100;
}

// Función para calcular el porcentaje de promocionados
function calcularPorcentajePromocionados() {
  let contadorPromocionados = 0;
  for (let i = 0; i < estudiantes.length; i++) {
    if (estudiantes[i].nota >= 7 && estudiantes[i].nota <= 10) {
      contadorPromocionados++;
    }
  }
  return (contadorPromocionados / estudiantes.length) * 100;
}

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje, input) {
  const errorDiv = document.getElementById("errorDiv");
  errorDiv.textContent = mensaje;

  // Agregar clase de animación para resaltar el error
  errorDiv.classList.add("error-animation");

  // Enfocar en el campo de entrada (si se proporciona)
  if (input) {
    input.focus();
  }

  // Quitar la clase de animación después de 3 segundos
  setTimeout(() => {
    errorDiv.classList.remove("error-animation");
    errorDiv.textContent = "";
  }, 3000);
}

// Función para guardar la lista de estudiantes en el almacenamiento local
function guardarListaEstudiantes() {
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

// Función para cargar la lista de estudiantes del almacenamiento local
function cargarListaEstudiantes() {
  const estudiantesGuardados = localStorage.getItem("estudiantes");
  if (estudiantesGuardados) {
    estudiantes = JSON.parse(estudiantesGuardados);

    // Mostrar los estudiantes en la lista de estudiantes ingresados
    estudiantes.forEach(estudiante => {
      const nuevoEstudianteLi = document.createElement("li");
      nuevoEstudianteLi.textContent = `${estudiante.nombre}: ${estudiante.nota}`;
      estudiantesIngresadosOl.appendChild(nuevoEstudianteLi);
    });
  }
}

// Cargar la lista de estudiantes al cargar la página
cargarListaEstudiantes();
