let paso=1;const pasoInicial=1,pasoFinal=3,d=document,cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),paguinaSiguiente(),paguinaAnterior(),consultarAPI(),nombreCliente(),idCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");d.querySelector("#paso-"+paso).classList.add("mostrar");const t=d.querySelector(".actual");t&&t.classList.remove("actual");d.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){d.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){const e=d.querySelector("#siguiente"),t=d.querySelector("#anterior");1===paso?(t.classList.add("ocultar"),e.classList.remove("ocultar")):3===paso?(t.classList.remove("ocultar"),e.classList.add("ocultar"),mostrarResumen()):(t.classList.remove("ocultar"),e.classList.remove("ocultar")),mostrarSeccion()}function paguinaAnterior(){d.querySelector("#anterior").addEventListener("click",(function(){paso<=1||(paso--,botonesPaginador())}))}function paguinaSiguiente(){d.querySelector("#siguiente").addEventListener("click",(function(){paso>=3||(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="http://localhost:8081/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:a,precio:o}=e,r=d.createElement("P");r.classList.add("nombre-servicio"),r.textContent=a;const n=d.createElement("P");n.classList.add("precio-servicio"),n.textContent="$"+o;const i=d.createElement("DIV");i.classList.add("servicio"),i.dataset.idservicio=t,i.appendChild(r),i.appendChild(n),i.onclick=function(){seleccionarServicio(e)};d.querySelector("#servicios").appendChild(i)})}function seleccionarServicio(e){const{id:t}=e,{servicios:a}=cita,o=d.querySelector(`[data-idservicio="${t}"]`);a.some(e=>e.id===t)?(cita.servicios=a.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...a,e],o.classList.add("seleccionado"))}function idCliente(){cita.id=d.querySelector("#id").value}function nombreCliente(){cita.nombre=d.querySelector("#nombre").value}function seleccionarFecha(){d.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[6,0].includes(t)?(e.target.value="",mostrarAlerta("Fines de Semana estamos cerrados","error",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){d.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<9||t>19?(e.target.value="",mostrarAlerta("Atendemos de Corrido de 9 a 19","error",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,a,o=!0){const r=d.querySelector(".alerta");r&&r.remove();const n=d.createElement("DIV");n.textContent=e,n.classList.add("alerta"),n.classList.add(t);d.querySelector(a).appendChild(n),o&&setTimeout(()=>{n.remove()},3e3)}function mostrarResumen(){const e=d.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||cita.servicios.length<=0)return void mostrarAlerta("Faltas datos de servicios, fecha u Hora","error",".contenido-resumen",!1);const{nombre:t,fecha:a,hora:o,servicios:r}=cita,n=d.createElement("P");n.innerHTML="<span>Nombre:</span> "+t;const i=new Date(a),c=i.getMonth(),s=i.getDate()+2,l=i.getFullYear(),u=new Date(Date.UTC(l,c,s)).toLocaleDateString("es-AR",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=d.createElement("P");p.innerHTML="<span>Fecha:</span> "+u;const m=d.createElement("P");m.innerHTML=`<span>Hora:</span> ${o} Horas`;const v=d.createElement("H3");v.textContent="Resumen de Servicios",e.appendChild(v),r.forEach(t=>{const{id:a,nombre:o,precio:r}=t,n=d.createElement("DIV");n.classList.add("contenedor-servicio");const i=d.createElement("P");i.textContent=o;const c=d.createElement("p");c.innerHTML="<span>Precio</span> $"+r,n.appendChild(i),n.appendChild(c),e.appendChild(n)});const h=d.createElement("H3");h.textContent="Resumen de la Cita",e.appendChild(h);const f=d.createElement("BUTTON");f.classList.add("boton"),f.textContent="Reservar Cita",f.onclick=reservarCita,e.appendChild(n),e.appendChild(p),e.appendChild(m),e.appendChild(f)}async function reservarCita(){const{id:e,fecha:t,hora:a,servicios:o}=cita,r=o.map(e=>e.id);console.log(r);const n=new FormData;n.append("clienteId",e),n.append("fecha",t),n.append("hora",a),n.append("servicios",r);try{const e="http://localhost:8081/api/citas",t=await fetch(e,{method:"POST",body:n});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu Cita Fue Creada Correctamente",button:"OK"}).then(()=>{setTimeout(()=>{window.location.reload()},3e3)})}catch(e){Swal.fire({icon:"error",title:"Error.",text:"Hubo un error al guardar la cita"})}}d.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));