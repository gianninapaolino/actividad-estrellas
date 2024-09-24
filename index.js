const jsonUrl = 'https://nataliasotelo.github.io/act-estrellas/estrellas.json';

// Función para obtener datos del JSON
function getJSONData(jsonUrl) {
  return fetch(jsonUrl)
    .then(response => response.ok ? response.json() : Promise.reject(Error(response.statusText)))
    .then(data => ({ status: 'ok', data }))
    .catch(error => ({ status: 'error', data: error }));
}

// Llamada para obtener los datos
getJSONData(jsonUrl).then(function(respObj) {
  if (respObj.status === "ok") {
    showData(respObj.data);      // Mostrar lista de usuarios
    populateSelect(respObj.data); // Llenar el selector de personas
  }
});

// Mostrar lista de usuarios
function showData(dataArray) {
  const userList = document.getElementById('userList');  // Seleccionar el contenedor

  for (const item of dataArray) {
    userList.innerHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${item.name} ${'⭐'.repeat(item.numberrange)}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${item.company}</h6>
        </div>
      </div>`; 
  }
}

// Llenar el <select> con los nombres de las personas
function populateSelect(dataArray) {
  const userSelect = document.getElementById('userSelect'); // Seleccionar el <select>
  
  for (const item of dataArray) {
    let option = document.createElement('option'); // Crear una nueva opción
    option.value = item.name; // Usar el nombre como valor
    option.text = item.name;  // Mostrar el nombre en el texto
    userSelect.appendChild(option); // Añadir la opción al <select>
  }
}
