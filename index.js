const jsonUrl = 'https://nataliasotelo.github.io/act-estrellas/estrellas.json';
const form = document.getElementById('rate-form');
const arreglo = document.getElementById('userList');

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

// Función para generar estrellas con Font Awesome
function generarEstrellas(rate) {
  let starsHtml = '';
  for (let i = 0; i < rate; i++) {
    starsHtml += '<i class="fas fa-star" style="color: #f5b301;"></i>'; // Agregar estrella dorada
  }
  return starsHtml;
}

// Capturar el evento de envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitamos el envío real del formulario

  // Capturamos los valores ingresados por el usuario
  const name = document.getElementById('name').value;
  const company = document.getElementById('company').value;
  const rating = parseInt(document.querySelector('input[name="rate"]:checked').value); // Obtener la calificación seleccionada

  // Validar que el rating esté dentro del rango 1-5
  if (!rating || rating < 1 || rating > 5) {
    alert('Por favor ingrese una calificación válida.');
    return;
  }

  // Crear un objeto simulando la nueva calificación
  const newRating = {
    name: name,
    company: company,
    numberrange: rating,
  };

  // Mostrar la nueva calificación junto con las anteriores
  const stars = generarEstrellas(newRating.numberrange); // Generar estrellas con Font Awesome
  userList.innerHTML += `<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">${newRating.name} ${stars} </h5>
    <h6 class="card-subtitle mb-2 text-muted"> ${newRating.company}</h6>
  </div>
</div>`; 
  
  


  // Limpiar el formulario después del envío
  form.reset();
});
