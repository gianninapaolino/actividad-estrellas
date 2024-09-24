const jsonUrl = 'https://nataliasotelo.github.io/act-estrellas/estrellas.json'


function getJSONData(jsonUrl) {
    return fetch(jsonUrl)
      .then(response => response.ok ? response.json() : Promise.reject(Error(response.statusText)))
      .then(data => ({ status: 'ok', data }))
      .catch(error => ({ status: 'error', data: error }));
  }
  
  
  
  getJSONData(jsonUrl).then(function(respObj) {
    if (respObj.status === "ok") {
      showData(respObj.data);
    } 
  });


  function showData(dataArray) {
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

