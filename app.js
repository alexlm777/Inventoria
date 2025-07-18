// —————————— GASTOS ——————————
document.getElementById('form-gasto').addEventListener('submit', e => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const fecha = document.getElementById('fecha').value;
  const tipo = document.getElementById('tipo-gasto').value;
  const gasto = { descripcion, monto, fecha, tipo };

  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.push(gasto);
  localStorage.setItem('gastos', JSON.stringify(gastos));

  mostrarGastos();
  mostrarEstadisticas();
  e.target.reset();
});

function mostrarGastos() {
  const tbody = document.querySelector('#tabla-gastos tbody');
  tbody.innerHTML = '';
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${g.fecha}</td><td>${g.descripcion}</td><td>${g.tipo}</td><td>Q${g.monto.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
}

// —————————— INGRESOS ——————————
document.getElementById('form-ingreso').addEventListener('submit', e => {
  e.preventDefault();
  const descripcion = document.getElementById('descripcion-ingreso').value;
  const monto = parseFloat(document.getElementById('monto-ingreso').value);
  const medio = document.getElementById('medio-ingreso').value;
  const fecha = document.getElementById('fecha-ingreso').value;
  const ingreso = { descripcion, monto, medio, fecha };

  const ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
  ingresos.push(ingreso);
  localStorage.setItem('ingresos', JSON.stringify(ingresos));

  mostrarIngresos();
  mostrarEstadisticas();
  e.target.reset();
});

function mostrarIngresos() {
  const tbody = document.querySelector('#tabla-ingresos tbody');
  tbody.innerHTML = '';
  const ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
  ingresos.forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.fecha}</td><td>${i.descripcion}</td><td>${i.medio}</td><td>Q${i.monto.toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
}

// ———————— ESTADÍSTICAS ————————
function mostrarEstadisticas() {
  // Gastos por tipo
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  const totGastos = {};
  gastos.forEach(g => totGastos[g.tipo] = (totGastos[g.tipo]||0) + g.monto);

  const tbodyG = document.querySelector('#tabla-est-gastos tbody');
  tbodyG.innerHTML = '';
  for (let tipo in totGastos) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${tipo}</td><td>Q${totGastos[tipo].toFixed(2)}</td>`;
    tbodyG.appendChild(tr);
  }

  // Ingresos por medio
  const ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
  const totIngresos = {};
  ingresos.forEach(i => totIngresos[i.medio] = (totIngresos[i.medio]||0) + i.monto);

  const tbodyI = document.querySelector('#tabla-est-ingresos tbody');
  tbodyI.innerHTML = '';
  for (let medio in totIngresos) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${medio}</td><td>Q${totIngresos[medio].toFixed(2)}</td>`;
    tbodyI.appendChild(tr);
  }

  // Balance
  const sumaG = Object.values(totGastos).reduce((a,b) => a+b, 0);
  const sumaI = Object.values(totIngresos).reduce((a,b) => a+b, 0);
  document.getElementById('balance').textContent = `Balance: Q${(sumaI - sumaG).toFixed(2)}`;
}

// ———————— TOGGLE MUTUO ————————
const btnTablas = document.getElementById('toggle-tablas');
const btnEst = document.getElementById('toggle-estadisticas');
const contTablas = document.getElementById('tablas-registros');
const contEst = document.getElementById('estadisticas');

btnTablas.addEventListener('click', () => {
  const isVisible = contTablas.style.display === 'block';
  contTablas.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) { contEst.style.display = 'none'; btnEst.textContent = 'Mostrar estadísticas'; }
  btnTablas.textContent = isVisible ? 'Mostrar registros' : 'Ocultar registros';
});

btnEst.addEventListener('click', () => {
  const isVisible = contEst.style.display === 'block';
  contEst.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) { contTablas.style.display = 'none'; btnTablas.textContent = 'Mostrar registros'; }
  btnEst.textContent = isVisible ? 'Mostrar estadísticas' : 'Ocultar estadísticas';
});

// ———————— INICIALIZACIÓN ————————
mostrarIngresos();
mostrarGastos();
mostrarEstadisticas();

// ——————————————— FILTRO DE TABLAS ———————————————
document.getElementById('filtro-tabla').addEventListener('keyup', function () {
  const filtro = this.value.toLowerCase();

  // Filtra ambas tablas
  ['tabla-gastos', 'tabla-ingresos'].forEach(id => {
    const filas = document.querySelectorAll(`#${id} tbody tr`);
    filas.forEach(fila => {
      const textoFila = fila.textContent.toLowerCase();
      fila.style.display = textoFila.includes(filtro) ? '' : 'none';
    });
  });
});

// ——————————————— EXPORTACIÓN A EXCEL ———————————————
function exportarTabla(idTabla, nombreArchivo) {
  const tabla = document.getElementById(idTabla);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(tabla);
  XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
  XLSX.writeFile(wb, nombreArchivo);
}

document.getElementById('exportar-gastos').addEventListener('click', () => {
  exportarTabla('tabla-gastos', 'gastos.xlsx');
});

document.getElementById('exportar-ingresos').addEventListener('click', () => {
  exportarTabla('tabla-ingresos', 'ingresos.xlsx');
});

// ——————————————— REGISTRO DE USUARIOS ———————————————
document.getElementById("form-usuario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contrasena = document.getElementById("contrasena").value;
  const id_familia = document.getElementById("id_familia").value;

  try {
    const respuesta = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, correo, contrasena, id_familia })
    });

    const datos = await respuesta.json();
    document.getElementById("mensaje-usuario").textContent = datos.mensaje || datos.error;

    if (respuesta.ok) {
      document.getElementById("form-usuario").reset();
    }
  } catch (error) {
    document.getElementById("mensaje-usuario").textContent = "Error al conectar con el servidor.";
    console.error("Error al registrar usuario:", error);
  }
});


