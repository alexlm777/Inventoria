// —————————— GASTOS ——————————
document.getElementById('form-gasto').addEventListener('submit', function(e) {
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
  this.reset();
});

function mostrarGastos() {
  const tbody = document.querySelector('#tabla-gastos tbody');
  tbody.innerHTML = '';

  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${g.fecha}</td>
      <td>${g.descripcion}</td>
      <td>${g.tipo}</td>
      <td>Q${g.monto.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// —————————— INGRESOS ——————————
document.getElementById('form-ingreso').addEventListener('submit', function(e) {
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
  this.reset();
});

function mostrarIngresos() {
  const tbody = document.querySelector('#tabla-ingresos tbody');
  tbody.innerHTML = '';

  const ingresos = JSON.parse(localStorage.getItem('ingresos')) || [];
  ingresos.forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i.fecha}</td>
      <td>${i.descripcion}</td>
      <td>${i.medio}</td>
      <td>Q${i.monto.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ———————— TOGGLE TABLAS ————————
const btnToggle = document.getElementById('toggle-tablas');
const contenedor = document.getElementById('tablas-registros');

btnToggle.addEventListener('click', () => {
  const visible = contenedor.style.display === 'block';
  contenedor.style.display = visible ? 'none' : 'block';
  btnToggle.textContent = visible ? 'Mostrar registros' : 'Ocultar registros';
});

// ———————— INICIALIZACIÓN ————————
mostrarIngresos();
mostrarGastos();

