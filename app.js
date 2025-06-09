// app.js
document.getElementById('form-gasto').addEventListener('submit', function (e) {
  e.preventDefault();

  const descripcion = document.getElementById('descripcion').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const fecha = document.getElementById('fecha').value;

  const gasto = {
    descripcion,
    monto,
    fecha
  };

  let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.push(gasto);
  localStorage.setItem('gastos', JSON.stringify(gastos));

  mostrarGastos();
  this.reset();
});

function mostrarGastos() {
  const lista = document.getElementById('lista-gastos');
  lista.innerHTML = '';

  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  gastos.forEach((gasto, index) => {
    const li = document.createElement('li');
    li.textContent = `${gasto.fecha} - ${gasto.descripcion}: Q${gasto.monto.toFixed(2)}`;
    lista.appendChild(li);
  });
}

mostrarGastos();
