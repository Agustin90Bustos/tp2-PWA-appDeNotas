navigator.serviceWorker.register('sw.js');
const btnSave = document.querySelector('#btn-save');
const textArea = document.querySelector('#text-1');
let container = document.querySelector('.collection');
let lista = [];
// FORMATO:
//let lista = [ { nota: 'descripción de la nota', fecha: '17/11/2022'} ];
let btnsEliminar = [];


document.addEventListener('DOMContentLoaded', function() {
    let sideNav = document.querySelectorAll('.sidenav');
    let instanciaSide = M.Sidenav.init(sideNav  , {});

    let modal = document.querySelectorAll('.modal');
    let instanciaModal = M.Modal.init(modal, {});

    lista = leerNotas();
    renderizarNotas(lista);
    eliminarNotas();
});

/* - FUNCION 1:  Obtiene el texto del textArea y guarda en el texto en el array - */
btnSave.addEventListener('click', ()=>{
  let getFecha = new Date().toLocaleString();
  let nota = {
    nota: textArea.value,
    fecha: getFecha
  }
  lista.push(nota);
  textArea.value = '';

  guardarNotas(lista);
})

/* -------- FUNCION 2: Recibe el array y lo guarda en el localStorage ------- */
function guardarNotas(array){
  listaString = JSON.stringify(array);
  if (localStorage) {
    localStorage.clear();
    localStorage.setItem('notas', listaString);
  } else {
    localStorage.setItem('notas', listaString)
  }
  renderizarNotas(array);
}

/* --------- FUNCION 3: Lee los datos del localStorage y lo retorna --------- */
function leerNotas(){
  if (localStorage.notas) {
    let cacheNota = localStorage.notas;
    let cacheArray = JSON.parse(cacheNota);
    lista = cacheArray;
    return lista;
  } else {
    return lista;
  }
}

/* -------- FUNCION 4: Recibe el array y lo renderiza en el container ------- */
function renderizarNotas(array){
  if (array.length > 0) {
    container.innerHTML = '';
  
    array.forEach(element => {
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.className = 'fecha';
      let span2 = document.createElement('span');
      span2.className = 'nota';
      let img = document.createElement('img');
      img.src = 'icons/tacho.png';
      img.alt = 'Tachar';
      img.className = 'eliminar';
      span2.innerHTML = `${element.nota} `;
      span.innerHTML = `${element.fecha}`;
      li.append(span2, span, img);
      container.append(li);
    });

    eliminarNotas();
  } else {
    let li = document.createElement('li');
    li.id = 'msg';
    li.innerHTML = 'Cree una nota';
    container.append(li);
  }
}

function eliminarNotas(){
  btnsEliminar = []
  btnsEliminar = document.querySelectorAll('.eliminar');

  if (btnsEliminar.length == 1) {
    btnsEliminar.forEach(button => {
      button.addEventListener('click', (e) => {
        if (confirm('¿Está seguro que desea borrar esta nota?')) {
          lista = [];
          container.innerHTML = '';
          guardarNotas(lista);
        }
      })
    });
  } else {
    btnsEliminar.forEach(button => {
      button.addEventListener('click', (e) => {
        if (confirm('¿Está seguro que desea borrar esta nota?')) {
          let fecha = e.target.previousElementSibling.innerHTML;
          for (let nota in lista) {
            if (lista[nota].fecha === fecha) {
              lista.splice(nota, 1);
              guardarNotas(lista);
            }
          }
        }
      })
    });
  }
}