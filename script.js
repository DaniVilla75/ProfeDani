let proyectosData = [];

function mostrarProyectos(categoria) {
  const container = document.querySelector('.grid');
  container.innerHTML = '';

  const filtrados = categoria === 'todos'
    ? proyectosData
    : proyectosData.filter(p => p.categoria === categoria);

  filtrados.forEach(proyecto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${proyecto.titulo}</h3>
      <a href="${proyecto.url}" target="_blank">Ingresar</a>
    `;
    container.appendChild(card);
  });
}

fetch('proyectos.json')
  .then(response => response.json())
  .then(data => {
    proyectosData = data;
    mostrarProyectos('todos');
  });

document.getElementById('categoria').addEventListener('change', (e) => {
  mostrarProyectos(e.target.value);
});
