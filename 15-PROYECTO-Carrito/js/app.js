
const carrito=document.querySelector('#carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody')
const vaciarCarrito=document.querySelector('#vaciar-carrito')
const listaCursos=document.querySelector('#lista-cursos')
let compras=[];

eventListen();
function eventListen(){
    listaCursos.addEventListener('click',agregar)

    vaciarCarrito.addEventListener('click',vaciar=>{

        compras=[];
        remover()
    })

    carrito.addEventListener('click',eliminarCurso)
}// En esta funcion se registran todos los eventos al pulsar el boton 

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const uno =e.target.getAttribute('data-id');
        console.log(uno)
        compras=compras.filter(com=>com.id!==uno)
        console.log(compras)
    }
    añadir(compras)
}

function agregar(e){
    console.log(e)
     e.preventDefault();// hace que no haga la accion por defecto
    if(e.target.classList.contains("agregar-carrito")){
        const lectura=e.target.parentElement.parentElement// Aqui se hace un traversing
         leer(lectura);
    }
}

function leer(lectura){
        
        const img=lectura.querySelector('img').src;
        const titulo=lectura.querySelector('h4').textContent;
        const precio=lectura.querySelector('.precio span').textContent;
        const identificador=lectura.querySelector('a').getAttribute('data-id');
        const datos={
            imagen:img,
            curso:titulo,
            precio:precio,
            id:identificador,
            cantidad:1
        };
        const resultado=compras.some(compra=>datos.id===compra.id)
        console.log(resultado)
        if(resultado){
             const compramos=compras.map(compra=>{
                 if(datos.id===compra.id){
                    
                    compra.cantidad+=1
                    return compra
                 }else{
                   return compra
                }
         })
           compras=[...compramos]
       }
        else{
            compras=[...compras,datos];
        }
        añadir(compras)
        console.log(compras)
}

function añadir(compras){
    //contenedorCarrito.innerHTML=''
    remover()
    compras.forEach(element => {

        const {imagen,curso,precio,cantidad}=element
        const row=document.createElement('tr')
        row.innerHTML=
       `
       <img src="${imagen}"  width=120>
       
       <td>
        ${curso}
        </td>

        <td>
        ${precio}
        </td>

        <td>
        ${cantidad}
        </td>

        <a href="#" class="borrar-curso" data-id="${element.id}">
         X
        <a>
       ` 
        contenedorCarrito.appendChild(row)
   });
    
}

function remover(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


/* function borrarElementos(){
     carrito.addEventListener('click',borrar)
}

function borrar(e){
    
 if(e.target.classList.contains('borrar-curso')){
    if(e.target.previousElementSibling.innerHTML==1){
         const valor=compras.some((borrarCursos,i)=>{
            if(e.target.parentElement.children[1].textContent.trim()==borrarCursos.curso.trim()){
                compras.splice(i,1)
                
            }
         }) 
         e.target.parentElement.innerHTML=''   
    }else{
        e.target.previousElementSibling.innerHTML-=1
    }
 }
}
borrarElementos() */




/* function borrarTodo(){
 
    vaciarCarrito.addEventListener('click',todo)
}

function todo(e){
  
    console.log(e.target.classList)
    if(e.target.classList.contains('button')){
       const borradores=e.target.previousElementSibling.children[1];
       borradores.innerHTML=''
       compras.splice(0,compras.length)
    }
}

borrarTodo() */