const baseURL = "http://localhost:8000/api";
const baseIMG = "http://localhost:8000/";

function getAllRequest() {
    axios.get(baseURL + '/motos')
        .then(function(response) {
            contentWrapper.innerHTML = '';
            console.log(response.data.results);
            let results = response.data.results;
            if (response.data.total) {
                let nodes = results.map(result => {
                    let div = document.createElement('div');
                    // div.innerHTML = result.marca;
                    div.innerHTML = `
                    <!-- Card with no padding with a content container nested inside of it -->
                    <div class="w-400 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
                      <div class="card p-0"> <!-- p-0 = padding: 0 -->
                        <img src="${ baseIMG+'storage/img/bikes/'+result.image }" class="img-fluid rounded-top" alt="..."> <!-- rounded-top = rounded corners on the top -->
                        <!-- Nested content container inside card -->
                        <div class="content">
                          <h2 class="content-title">
                          ${result.marca}
                          </h2>
                          <p class="text-muted">
                          MODELO:
                          ${result.modelo}
                          </p>
                          <p class="text-muted">
                          PRECIO: 
                          ${result.precio}
                          </p>
                          <div class="text-right"> <!-- text-right = text-align: right -->
                            <button onclick="getFilteredRequest(${result.id})" class="btn">VER</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                    return div;
                });
                contentWrapper.append(...nodes);
            }


        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function getFilteredRequest(id = null) {
    contentWrapper.innerHTML = '';
    if (getFilteredParam.value) {
        id = getFilteredParam.value;
    }

    axios.get(baseURL + '/moto/' + id, {
            // params: {
            //     filter: 'myFilter'
            // }
        })
        .then(function(response) {
            console.log(response);
            if (response.data.status == 'OK') {
                let results = response.data.results[0];
                console.log(response.data.status);
                let div = document.createElement('div');
                // div.innerHTML = result.marca;
                div.innerHTML = `
                    <!-- Card with no padding with a content container nested inside of it -->
                    <div class="w-400 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
                      <div class="card p-0"> <!-- p-0 = padding: 0 -->
                        <img src="${ baseIMG+'storage/img/bikes/'+results.image }" class="img-fluid rounded-top" alt="..."> <!-- rounded-top = rounded corners on the top -->
                        <!-- Nested content container inside card -->
                        <div class="content">
                          <h2 class="content-title">
                          ${results.marca}
                          </h2>
                          <p class="text-muted">
                          MODELO:
                          ${results.modelo}
                          </p>
                          <p class="text-muted">
                          PRECIO: 
                          ${results.precio}
                          </p>
                          <div class="text-right"> <!-- text-right = text-align: right -->
                            <button onClick="getAllRequest()" class="btn">LISTADO DE MOTOS</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                contentWrapper.append(div);
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function getByMarca() {
    contentWrapper.innerHTML = '';
    let marca = getByMarcaParam.value;
    axios.get(baseURL + '/moto/marca/' + marca)
        .then(function(response) {
            console.log(response);
            contentWrapper.innerHTML = '';
            console.log(response.data.results);
            let results = response.data.results;
            if (response.data.total) {
                let nodes = results.map(result => {
                    let div = document.createElement('div');
                    // div.innerHTML = result.marca;
                    div.innerHTML = `
                    <!-- Card with no padding with a content container nested inside of it -->
                    <div class="w-400 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
                      <div class="card p-0"> <!-- p-0 = padding: 0 -->
                        <img src="${ baseIMG+'storage/img/bikes/'+result.image }" class="img-fluid rounded-top" alt="..."> <!-- rounded-top = rounded corners on the top -->
                        <!-- Nested content container inside card -->
                        <div class="content">
                          <h2 class="content-title">
                          ${result.marca}
                          </h2>
                          <p class="text-muted">
                          MODELO:
                          ${result.modelo}
                          </p>
                          <p class="text-muted">
                          PRECIO: 
                          ${result.precio}
                          </p>
                          <div class="text-right"> <!-- text-right = text-align: right -->
                            <button onclick="getFilteredRequest(${result.id})" class="btn">VER</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                    return div;
                });
                contentWrapper.append(...nodes);
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function getByModelo() {
    let modelo = getByModeloParam.value;
    axios.get(baseURL + '/moto/modelo/' + modelo)
        .then(function(response) {
            console.log(response);
            contentWrapper.innerHTML = '';
            console.log(response.data.results);
            let results = response.data.results;
            if (response.data.total) {
                let nodes = results.map(result => {
                    let div = document.createElement('div');
                    // div.innerHTML = result.marca;
                    div.innerHTML = `
                    <!-- Card with no padding with a content container nested inside of it -->
                    <div class="w-400 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
                      <div class="card p-0"> <!-- p-0 = padding: 0 -->
                        <img src="${ baseIMG+'storage/img/bikes/'+result.image }" class="img-fluid rounded-top" alt="..."> <!-- rounded-top = rounded corners on the top -->
                        <!-- Nested content container inside card -->
                        <div class="content">
                          <h2 class="content-title">
                          ${result.marca}
                          </h2>
                          <p class="text-muted">
                          MODELO:
                          ${result.modelo}
                          </p>
                          <p class="text-muted">
                          PRECIO: 
                          ${result.precio}
                          </p>
                          <div class="text-right"> <!-- text-right = text-align: right -->
                            <button onclick="getFilteredRequest(${result.id})" class="btn">VER</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                    return div;
                });
                contentWrapper.append(...nodes);
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function postRequest() {
    let newMoto = {
        "marca": nuevaMoto['marca'].value,
        "modelo": nuevaMoto['modelo'].value,
        "kms": parseInt(nuevaMoto['kms'].value),
        "precio": parseInt(nuevaMoto['precio'].value),
        "matriculada": nuevaMoto['matriculada'].checked ? 1 : 0,
        "matricula": nuevaMoto['matricula'].value,
        "color": nuevaMoto['color'].value,
        "caballos": parseInt(nuevaMoto['caballos'].value),

    }
    newMoto = JSON.stringify(newMoto);
    axios.post(baseURL + '/moto', newMoto, {
            headers: {
                // 'application/json' is the modern content-type for JSON, but some
                // older servers may use 'text/json'.
                // See: http://bit.ly/text-json
                'content-type': 'application/json'
            }
        })
        .then(function(response) {
            console.log(response);
            if (response.statusText == 'Created') {
                salida.innerHTML = 'Status: ' + response.status + " --- " + response.data.status + '---- Moto creada con ID: ' + response.data.results[0].id;
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function putRequest() {
    id = 10;
    axios.put('http://localhost:8080/item/' + id, {
            data: 'NewItem'
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function patchRequest() {
    id = 10;
    axios.patch('http://localhost:8080/item/' + id, {
            data: 'NewItem'
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function deleteRequest() {
    id = 10;
    axios.delete('http://localhost:8080/item/' + id)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}


window.onload = function() {
    matricula.disabled = !matriculada.checked;
    matriculada.onchange = function() {
        matricula.disabled = !matriculada.checked;
    }
};

// function imprimirDataConTotal() {
//     let results = response.data.results;
//     if (response.data.total) {
//         let nodes = results.map(result => {
//             let div = document.createElement('div');
//             // div.innerHTML = result.marca;
//             div.innerHTML = `
//             <!-- Card with no padding with a content container nested inside of it -->
//             <div class="w-400 mw-full"> <!-- w-400 = width: 40rem (400px), mw-full = max-width: 100% -->
//               <div class="card p-0"> <!-- p-0 = padding: 0 -->
//                 <img src="${ baseIMG+'storage/img/bikes/'+result.image }" class="img-fluid rounded-top" alt="..."> <!-- rounded-top = rounded corners on the top -->
//                 <!-- Nested content container inside card -->
//                 <div class="content">
//                   <h2 class="content-title">
//                   ${result.marca}
//                   </h2>
//                   <p class="text-muted">
//                   MODELO:
//                   ${result.modelo}
//                   </p>
//                   <p class="text-muted">
//                   PRECIO: 
//                   ${result.precio}
//                   </p>
//                   <div class="text-right"> <!-- text-right = text-align: right -->
//                     <a href="#" class="btn">VER</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             `;
//             return div;
//         });
//         contentWrapper.append(...nodes);
//     }
// }

// ;