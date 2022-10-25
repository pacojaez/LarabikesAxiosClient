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
                          <div class="text-right">
                            <a class="btn btn-primary m-5 p-5" type="button" onclick="edit(${results.id})">ACTUALIZAR</a>
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

function createForm() {
    contentWrapper.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = `
                    <div class="d-flex flex-column m-10 p-15">
                        <h2>FORMULARIO DE CREACIÓN DE LA MOTO</h2>
                        <form class="w-400 mw-full" enctype="multipart/form-data" id="nuevaMoto">
                            <!-- Input -->
                            <div class="form-group">
                                <label for="marca" class="required">MARCA</label>
                                <input type="text" class="form-control" id="marca" placeholder="una marca de moto" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="modelo" class="required">MODELO</label>
                                <input type="text" class="form-control" id="modelo" placeholder="un modelo válido" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="kms" class="required">KMS</label>
                                <input type="number" class="form-control" id="kms" min="1" max="5" placeholder="" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="precio" class="required">PRECIO (en €)</label>
                                <input type="number" class="form-control" id="precio" placeholder="" min="100" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="caballos" class="required">CABALLOS</label>
                                <input type="text" class="form-control" id="caballos" required="required" placeholder="">
                            </div>
                            <!-- Input -->
                            <!-- Switch -->
                            <div class="form-group">
                                <div class="custom-switch">
                                    <input type="checkbox" id="matriculada" checked>
                                    <label for="matriculada">Matriculada?</label>
                                </div>
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="matricula" class="required">MATRICULA</label>
                                <input type="text" class="form-control" id="matricula" placeholder="0000XXX">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="color" class="required">COLOR</label>
                                <input type="text" class="form-control" id="color" placeholder="un color del arcoiris" required="required">
                            </div>
                            <button class="btn btn-primary m-5 p-5" type="button" onclick="postRequest()">GUARDAR</button>
                        </form>
                       
                        <br>
                        <output id="salida"></output>
                    </div>
                    `;
    contentWrapper.append(div);
}

function edit(id) {
    contentWrapper.innerHTML = '';

    axios.get(baseURL + '/moto/' + id, {
            // params: {
            //     filter: 'myFilter'
            // }
        })
        .then(function(response) {
            console.log(response);
            let results = response.data.results[0];
            let div = document.createElement('div');
            div.innerHTML = `
                    <div class="d-flex flex-column m-10 p-15">
                        <h2>FORMULARIO DE EDICION DE LA MOTO CON ID: ${results.id}</h2>
                        <form class="w-400 mw-full" enctype="multipart/form-data" id="actualizar">
                            <input type="hidden" id="idMoto" value="${results.id}" >
                            <!-- Input -->
                            <div class="form-group">
                                <label for="marca" class="required">MARCA</label>
                                <input type="text" class="form-control" id="marca" value="${results.marca}" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="modelo" class="required">MODELO</label>
                                <input type="text" class="form-control" id="modelo" value="${results.modelo}" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="kms" class="required">KMS</label>
                                <input type="number" class="form-control" id="kms" min="1" max="5" value="${results.kms}" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="precio" class="required">PRECIO</label>
                                <input type="number" class="form-control" id="precio" value="${results.precio}" min="100" required="required">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="caballos" class="required">CABALLOS</label>
                                <input type="text" class="form-control" id="caballos" required="required" value="${results.caballos}">
                            </div>
                            <!-- Input -->
                            <!-- Switch -->
                            <div class="form-group">
                                <div class="custom-switch">
                                    <input type="checkbox" id="matriculada" ${results.matriculada ? 'checked':''}>
                                    <label for="matriculada">Matriculada?</label>
                                </div>
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="matricula" class="required">MATRICULA</label>
                                <input type="text" class="form-control" id="matricula" value="${results.matricula}">
                            </div>
                            <!-- Input -->
                            <div class="form-group">
                                <label for="color" class="required">COLOR</label>
                                <input type="text" class="form-control" id="color" value="${results.color}" required="required">
                            </div>
                            <button class="btn btn-primary m-5 p-5" type="button" onclick="putRequest(${results.id})">GUARDAR</button>
                        </form>
                        <button class="btn btn-danger m-5 p-5" type="button" onclick="deleteRequest(${results.id})">BORRAR</button>
                        <br>
                        <output id="salida"></output>
                    </div>
                    `;
            contentWrapper.append(div);
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
        "user_id": 1,

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
                let link = document.createElement('div');
                // div.innerHTML = result.marca;
                link.innerHTML = `
                        <div class="text-left"> 
                            <button onclick="getFilteredRequest(${response.data.results[0].id})" class="btn">VER</button>
                        </div>
                    `;
                salida.append(link);
                toastAlert(`MOTO creada CON ID: ${response.data.results[0].id} `, "alert-success");
            }
            getAllRequest();
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function putRequest() {

    let moto = {
        "marca": actualizar['marca'].value,
        "modelo": actualizar['modelo'].value,
        "kms": parseInt(actualizar['kms'].value),
        "precio": parseInt(actualizar['precio'].value),
        "matriculada": actualizar['matriculada'].checked ? 1 : 0,
        "matricula": actualizar['matricula'].value,
        "color": actualizar['color'].value,
        "caballos": parseInt(actualizar['caballos'].value),
    }
    moto = JSON.stringify(moto);

    let id = parseInt(actualizar['idMoto'].value);

    axios.put(baseURL + '/moto/update/' + id, moto, {
            headers: {
                // 'application/json' is the modern content-type for JSON, but some
                // older servers may use 'text/json'.
                // See: http://bit.ly/text-json
                'content-type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(function(response) {
            console.log(response);
            if (response.data.status == 'OK') {
                salida.innerHTML = 'Status: ' + response.status + " --- " + response.data.status + '---- Moto actualizada con ID: ' + response.data.results[0].id;
                let link = document.createElement('div');
                // div.innerHTML = result.marca;
                link.innerHTML = `
                        <div class="text-left"> 
                            <button onclick="getFilteredRequest(${response.data.results[0].id})" class="btn">VER</button>
                        </div>
                    `;
                salida.append(link);
            }
            toastAlert(`MOTO ACTUALIZADA CON ID: ${response.data.results[0].id} `, "alert-success");
            getAllRequest();
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {});
}

function patchRequest() {
    id = 10;
    axios.patch(baseURL + '/moto/update/' + id, {
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

function deleteRequest(id) {
    axios.delete(baseURL + '/moto/delete/' + id)
        .then(function(response) {
            console.log(response);
            if (response.data.status == 'OK') {
                salida.innerHTML = 'Status: ' + response.status + " --- " + response.data.status + '---- Moto borrada CORRECTAMENTE';
            }
            toastAlert("MOTO BORRADA", "alert-success");
            getAllRequest();
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

function getId() {
    let url = location.href;
    let regex = /\?id=\d{1,}/;

    let resultados = regex.exec(url);

    if (resultados.lenght > 0) {
        console.log(resultados[0].split("=")[1]);
        return resultados[0].split("=")[1];
    } else {
        return undefined;
    }
}

// Toasts another alert (here, the options are shown)
function toastAlert(content, type) {
    var alertContent = content;
    // Built-in function
    halfmoon.initStickyAlert({
        content: alertContent, // Required, main content of the alert, type: string (can contain HTML)
        title: "TAREA REALIZADA", // Optional, title of the alert, default: "", type: string
        alertType: type, // Optional, type of the alert, default: "", must be "alert-primary" || "alert-success" || "alert-secondary" || "alert-danger"
        fillType: "", // Optional, fill type of the alert, default: "", must be "filled-lm" || "filled-dm" || "filled"
        hasDismissButton: true, // Optional, the alert will contain the close button if true, default: true, type: boolean
        timeShown: 5000 // Optional, time the alert stays on the screen (in ms), default: 5000, type: number
    })
}

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