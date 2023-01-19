const d = document;
d.addEventListener("DOMContentLoaded", function () {
  iniciarAP();
});

function iniciarAP() {
  buscarPorFecha();
}

function buscarPorFecha() {
  const fechaInput = d.querySelector("#fecha");
  fechaInput.addEventListener("input", function (e) {
    const fechaSeleccionada = e.target.value;
    console.log(fechaSeleccionada);
    window.location = `?fecha=${fechaSeleccionada}`;
  });
}
