document.getElementById("coments").addEventListener("submit", guardarComentario);

function guardarComentario(e) {
 
 let nombreComentario = document.getElementById("nombre-comentario").value;
 let comentarioGuardado = document.getElementById("comentario").value;

 const comentario = {
    nombreComentario,
    comentarioGuardado
 };

 if (localStorage.getItem("comentarios") === null) {
    let comentarios = [];
    comentarios.push(comentario);
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
 } else {
     let comentarios = JSON.parse(localStorage.getItem("comentarios"));
     comentarios.push(comentario);
     localStorage.setItem("comentarios", JSON.stringify(comentarios));
 }

    obtenerComentario();
    e.preventDefault();
}

function obtenerComentario() {
    
    let comentarios = JSON.parse(localStorage.getItem("comentarios"));
    let vista = document.getElementById("comentarios");

    vista.innerHTML = "";

    for(let i = 0; i < comentarios.length; i++){
        let nombreComentario = comentarios[i].nombreComentario;
        let comentarioGuardado = comentarios[i].comentarioGuardado;
        var d = new Date();
        vista.innerHTML += `<div class = "card mb-3">
            <div class = "card-body">
                <p>${nombreComentario} - ${comentarioGuardado} </p>
                <p class = "small font-italic" >${d.getDate()}/${d.getMonth()}/${d.getFullYear()}</p>
                <a class = "btn btn-danger" onclick="eliminarTarea('${nombreComentario}')"> 
                    Eliminar
                </a>
            </div>
        </div>`
    }
}

function eliminarTarea(nombreComentario) {
    let comentarios = JSON.parse(localStorage.getItem("comentarios"));
    for(let i = 0; i < comentarios.length; i++){
        if(comentarios[i].nombreComentario == nombreComentario){
            comentarios.splice(i , 1);
        }
    }
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    obtenerComentario();
}

obtenerComentario();