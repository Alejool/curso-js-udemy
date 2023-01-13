
(function(){

let DB;
const listadoClientes=document.querySelector('#listado-clientes');


 window.onload=function(){
  crearDB();

  if(window.indexedDB.open('clientes', 1)){
    listarClientes();
  }

  listadoClientes.addEventListener('click', borrarCliente);
 }


 function borrarCliente(e){

  const click=e.target.classList.contains('eliminar');
  const idCliente=Number(e.target.dataset.cliente);

  if(click){
   if(confirm('Deseas elimmar este cliente: ')){

    const transaction=DB.transaction(['clientes'], 'readwrite');

    const objectStore=transaction.objectStore('clientes');

    objectStore.delete(idCliente);

    transaction.oncomplete= function(){

      console.log('eliminado');
      e.target.parentElement.parentElement.remove();

    }
    transaction.onerror= function(){
      console.log('no fue posible eliminarlo')
    }
    


   }
  }


 }

 function crearDB(){
    const crearDB=window.indexedDB.open('clientes',1);


    crearDB.onerror=()=>{
      console.log('hubo un error');

    }

    crearDB.onsuccess=()=>{
      DB= crearDB.result;
      
    }

    crearDB.onupgradeneeded=function(e){
      const db=e.target.result;

      const objectStore=db.createObjectStore('clientes', 
      {
        keyPath:'id',
        autoIncrement:true
      })

      objectStore.createIndex('nombre', 'nombre', {unique:false});
      objectStore.createIndex('correo', 'correo', {unique:true});
      objectStore.createIndex('telefono', 'telefono', {unique:false});
      objectStore.createIndex('empresa', 'empresa', {unique:false});
      objectStore.createIndex('id', 'id', {unique:true});
  
      console.log('CREADA Y LISTA ');

      
    }

 }

 function listarClientes(){
  const conexion=window.indexedDB.open('clientes', 1);

  conexion.onerror=()=>{
    mostrarAlerta('hubo un error', 'error');

  };
  conexion.onsuccess=()=>{
    DB=conexion.result;

    const objectStore=DB.transaction('clientes').objectStore('clientes');
    objectStore.openCursor().onsuccess= function(e){
      const cursor=e.target.result;
  
      if(cursor){

        const {nombre, correo, telefono, empresa, id}=cursor.value;

        
        listadoClientes.innerHTML+=` <tr>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
            <p class="text-sm leading-10 text-gray-700"> ${correo} </p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
            <p class="text-gray-700">${telefono}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
            <p class="text-gray-600">${empresa}</p>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5 p-1 font-bold">Editar</a>
            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900  p-1 font-bold eliminar">Eliminar</a>
        </td>
    </tr>
`;
        cursor.continue();
      }
    }
  }}



})();