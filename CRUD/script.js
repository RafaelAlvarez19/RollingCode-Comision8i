// Guardar en LS - Tanto key como value deben ser . Si necesito transformar a string
// usamos el metodo JSON.stringify();
// localStorage.setItem('key', JSON.stringify(value)); 

// localStorage.removeItem('key');

// // Si el elemento esta en string lo transformamos a objeto con JSON.parse()
// let elemento = localStorage.getItem('key')
// elemento = JSON.parse(elemento);

let content = document.querySelector('#noticias');
let noticias = JSON.parse(localStorage.getItem('noticias')) || [];

function listarNoticias(){
    content.innerHTML = '';

    noticias.forEach(function(item, index){
        content.innerHTML += `<tr>
            <th scope="row">${index}</th>
            <td>${item.titulo}</td>
            <td>${item.body}</td>
            <td>${item.autor}</td>
            <td><img src="${item.imagen}" alt=""></td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onclick="setEditModal(${index})">
                    Editar
                </button>
                <button type="button" class="btn btn-danger" onclick="eliminar(${index})">
                   Eliminar
                </button>
            </td>
        </tr>`; 
    })
}

listarNoticias();

function agregarNoticia(){
    let titulo = document.querySelector('#Titulo').value;
    let contenido = document.querySelector('#Contenido').value;
    let autor = document.querySelector('#Autor').value;
    let imagen = document.querySelector('#Imagen').value;
    let formAgregarNoticia = document.querySelector('#createModal');
    
    noticias.push({
        titulo: titulo,
        body: contenido,
        autor: autor,
        imagen: imagen
    });
    
    localStorage.setItem('noticias', JSON.stringify(noticias));
    formAgregarNoticia.reset();
    listarNoticias();
}

function eliminar(id){
    let confirmar = confirm("Esta seguro de eliminar?");
    console.log("confirmar", confirmar);

    if(confirmar){
        noticias.splice(id, 1);
        
        localStorage.setItem('noticias', JSON.stringify(noticias));
    
        listarNoticias();    
    }
}

let editarNoticia = function(){
    let titulo = document.querySelector('#TituloEditar').value;
    let contenido = document.querySelector('#ContenidoEditar').value;
    let autor = document.querySelector('#AutorEditar').value;
    let imagen = document.querySelector('#ImagenEditar').value;

    let index = event.target.dataset.index;
    noticias[index] = {
        titulo: titulo,
        body: contenido,
        autor: autor,
        imagen: imagen
    }

    localStorage.setItem('noticias', JSON.stringify(noticias));
    
    listarNoticias(); 
}

function setEditModal(index){
    let editBtn = document.getElementById("EditBTN");
    editBtn.setAttribute("data-index", index);

    document.querySelector('#TituloEditar').value = noticias[index].titulo;
    document.querySelector('#ContenidoEditar').value = noticias[index].body;
    document.querySelector('#AutorEditar').value = noticias[index].autor;
    document.querySelector('#ImagenEditar').value;
}
