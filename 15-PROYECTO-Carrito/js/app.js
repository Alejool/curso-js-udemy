


const listaCursos=document.querySelector('#lista-cursos');
const carrito=document.querySelector('#carrito')
const vaciarcarrito=document.querySelector('#vaciar-carrito');
const contenedor=document.querySelector('#lista-carrito tbody')

let articuloCarritos=[];

eventos();
function eventos(){
  listaCursos.addEventListener('click', agregarCurso);
  
  //eliminar curso del carrito
  carrito.addEventListener('click', eliminarCurso);
  
  //vaciar carrito
  vaciarcarrito.addEventListener('click', ()=>{
   articuloCarritos=[];
   limpiarHtml();
  })
}






// funciones
function agregarCurso(e){
  e.preventDefault();

  if(e.target.classList.contains('agregar-carrito')){
  const curso=e.target.parentElement.parentElement;
  e.target.parentElement.parentElement;
    datosCursos(curso);
}


function datosCursos(curso){
   //creamos un objeto con la indo del curso

   const infoCurso={
    imagen: curso.querySelector('img').src,
    nombre: curso.querySelector('h4').textContent,
    creador: curso.querySelector('p').textContent,
    precio:curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1
   }

   //agregar elementos al carrito
 const existe=articuloCarritos.some(curso=> curso.id===infoCurso.id);

   if(existe){
  

    const actualizarC=articuloCarritos.map(curso=>{
      if(curso.id===infoCurso.id){
        curso.cantidad++;
        return curso;
      }
      else{
        return curso;
      }
     
    });
    articuloCarritos=[...actualizarC];
     
   }else{
    articuloCarritos=[...articuloCarritos, infoCurso]
   }

  
  
  carritoHTML();

}
}


//mostra en el HTML

function carritoHTML(){

  //limpiar el HTML 
    limpiarHtml();

  //RECORRER Y AÑADIRLE LOS CURSOS
  articuloCarritos.forEach((curso)=>{
    const {nombre, imagen, precio, cantidad, id}=curso;
    const row=document.createElement('tr');
    row.innerHTML=`
    <td><img src="${imagen}" width="200"></td>

    <td> ${nombre}</td>

    <td>${precio}</td>

    <td> ${cantidad}</td>
    <td> <a href="#" class="borrar-curso" data-id="${id}"> X </td> 

    `;

    //agregalo a carrito
   contenedor.append(row)
  })}

function limpiarHtml(){
  //forma lenta
  // contenedor.innerHTML='';

  //mejor hazlo asi:
  while(contenedor.firstChild){
    contenedor.removeChild(contenedor.firstChild)
  }
}

  // eliminar curso del carrito
function eliminarCurso(e){
   
  if(e.target.classList.contains('borrar-curso')){
      //eliminar del arreglo el curso que deseas
 const cursoId=e.target.getAttribute('data-id');
 articuloCarritos= articuloCarritos.filter(curso=>{
 if( curso.id===cursoId){
     if(curso.cantidad>1){
      curso.cantidad--;
      return curso;
     }else {
      delete curso;
     }
  }else {
    return curso;
  }
  } )
 
  carritoHTML();
      
    };

  /* articuloCarritos.map(curso=>{
      if(curso.id!==cursoId && curso.cantidad===1){
        articuloCarritos
        carritoHTML();
      }else{
        curso.cantidad--;
        carritoHTML();
      }
    })*/
     

  }
    
    






