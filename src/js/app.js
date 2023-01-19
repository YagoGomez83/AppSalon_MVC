let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;
const d = document;
const cita = {
  id: "",
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};
d.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});
function iniciarApp() {
  mostrarSeccion(); //Muestra o oculta las secciones
  tabs(); //cambia la sección cuando se presiona los tabs
  botonesPaginador(); //Agrega o quita los botones del paginador
  paguinaSiguiente();
  paguinaAnterior();
  consultarAPI(); //consulta la API en el backend de php
  nombreCliente(); //Añade el nombre del cliente al objeto de cita
  idCliente(); //Añade el id del cliente al objeto Cita
  seleccionarFecha(); //Añade la fecha de la cita en el objeto
  seleccionarHora(); //Añade la hora de la cita en el objeto
  mostrarResumen(); //Muestra el resumen de la cita
}
function mostrarSeccion() {
  //ocultamos
  const seccionAnterior = document.querySelector(".mostrar");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  //Seleccionar la seccion con el paso
  const seccion = d.querySelector(`#paso-${paso}`);

  seccion.classList.add("mostrar");

  //QUita la clase actual
  const tabAnterior = d.querySelector(".actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }
  //resalta el tab actual
  const tab = d.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const botones = d.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      paso = parseInt(e.target.dataset.paso);
      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paguinaSiguiente = d.querySelector("#siguiente");
  const paguinaAnterior = d.querySelector("#anterior");
  if (paso === 1) {
    paguinaAnterior.classList.add("ocultar");
    paguinaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paguinaAnterior.classList.remove("ocultar");
    paguinaSiguiente.classList.add("ocultar");
    mostrarResumen();
  } else {
    paguinaAnterior.classList.remove("ocultar");
    paguinaSiguiente.classList.remove("ocultar");
  }
  mostrarSeccion();
}
function paguinaAnterior() {
  const paguinaAnterior = d.querySelector("#anterior");
  paguinaAnterior.addEventListener("click", function () {
    if (paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}
function paguinaSiguiente() {
  const paguinaSiguiente = d.querySelector("#siguiente");
  paguinaSiguiente.addEventListener("click", function () {
    if (paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}

async function consultarAPI() {
  try {
    const URL = "http://localhost:8081/api/servicios";
    const resultado = await fetch(URL);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    //console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;
    const nombreServicio = d.createElement("P");
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;
    const precioServicio = d.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `$${precio}`;
    const servicioDiv = d.createElement("DIV");
    servicioDiv.classList.add("servicio");
    servicioDiv.dataset.idservicio = id;
    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);
    servicioDiv.onclick = function () {
      seleccionarServicio(servicio);
    };
    const servicioContenedor = d.querySelector("#servicios");
    servicioContenedor.appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  //console.log(servicio);
  const { id } = servicio;
  const { servicios } = cita;
  //identificar el elemnto al que se le da click
  const divServicio = d.querySelector(`[data-idservicio="${id}"]`);
  //Comprobar si un servicio ya fue agregado
  if (servicios.some((agregado) => agregado.id === id)) {
    //Eliminarlo
    cita.servicios = servicios.filter((agregado) => agregado.id !== id);
    divServicio.classList.remove("seleccionado");
  } else {
    //agregarlo
    cita.servicios = [...servicios, servicio];
    //console.log(cita);
    divServicio.classList.add("seleccionado");
  }
}

function idCliente() {
  cita.id = d.querySelector("#id").value;
}

function nombreCliente() {
  cita.nombre = d.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = d.querySelector("#fecha");
  inputFecha.addEventListener("input", function (e) {
    const dia = new Date(e.target.value).getUTCDay();
    if ([6, 0].includes(dia)) {
      e.target.value = "";
      mostrarAlerta("Fines de Semana estamos cerrados", "error", ".formulario");
    } else {
      cita.fecha = e.target.value;
      //console.log(cita);
    }
  });
}
function seleccionarHora() {
  const inputHora = d.querySelector("#hora");
  inputHora.addEventListener("input", function (e) {
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    if (hora < 9 || hora > 19) {
      e.target.value = "";
      mostrarAlerta("Atendemos de Corrido de 9 a 19", "error", ".formulario");
    } else {
      cita.hora = e.target.value;
      //console.log(cita);
    }
  });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  //previene que se genere mas de una alerta
  const alertaPrevia = d.querySelector(".alerta");
  if (alertaPrevia) {
    alertaPrevia.remove();
  }
  //Scripting para generar la alerta
  const alerta = d.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
  alerta.classList.add(tipo);
  const referencia = d.querySelector(elemento);
  referencia.appendChild(alerta);
  //eliminar la alerta
  if (desaparece) {
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function mostrarResumen() {
  const resumen = d.querySelector(".contenido-resumen");
  //limpiar el contenido de resumen
  while (resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }
  // console.log(cita);
  if (Object.values(cita).includes("") || cita.servicios.length <= 0) {
    mostrarAlerta(
      "Faltas datos de servicios, fecha u Hora",
      "error",
      ".contenido-resumen",
      false
    );
    return;
  }
  //formatear el div de resumen
  const { nombre, fecha, hora, servicios } = cita;
  const nombreCliente = d.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;
  //Formatear la fecha en español
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2;
  const year = fechaObj.getFullYear();
  const fechaUTC = new Date(Date.UTC(year, mes, dia));
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaUTC.toLocaleDateString("es-AR", opciones);

  const fechaCita = d.createElement("P");
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
  const horaCita = d.createElement("P");
  horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;
  //heading para servicios en resumen
  const headingServicios = d.createElement("H3");
  headingServicios.textContent = "Resumen de Servicios";
  resumen.appendChild(headingServicios);
  //itereamos los servicios seleccionados
  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;
    const contenedorServicio = d.createElement("DIV");
    contenedorServicio.classList.add("contenedor-servicio");
    const textoServicio = d.createElement("P");
    textoServicio.textContent = nombre;
    const precioServicio = d.createElement("p");
    precioServicio.innerHTML = `<span>Precio</span> $${precio}`;
    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);
    resumen.appendChild(contenedorServicio);
  });

  //heading para servicios en resumen
  const headingCita = d.createElement("H3");
  headingCita.textContent = "Resumen de la Cita";
  resumen.appendChild(headingCita);

  //Boton para crear una cita
  const botonReservar = d.createElement("BUTTON");
  botonReservar.classList.add("boton");
  botonReservar.textContent = "Reservar Cita";
  botonReservar.onclick = reservarCita;
  //Datos de la cita
  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);
  resumen.appendChild(botonReservar);
}

async function reservarCita() {
  const { id, fecha, hora, servicios } = cita;
  const idServicios = servicios.map((servicio) => servicio.id);
  console.log(idServicios);
  const datos = new FormData();
  datos.append("clienteId", id);
  datos.append("fecha", fecha);
  datos.append("hora", hora);
  datos.append("servicios", idServicios);
  // console.log([...datos]);

  //Petición hacia la api
  try {
    const url = "http://localhost:8081/api/citas";
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    });
    const resultado = await respuesta.json();
    if (resultado.resultado) {
      Swal.fire({
        icon: "success",
        title: "Cita Creada",
        text: "Tu Cita Fue Creada Correctamente",
        button: "OK",
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error.",
      text: "Hubo un error al guardar la cita",
    });
  }

  // console.log([...datos]); //impeccionar el formdata
}
