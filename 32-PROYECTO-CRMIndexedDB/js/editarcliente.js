
(function(){


  let idCliente;
  
  const inputNombre=document.querySelector('#nombre');
  const inputTelefono=document.querySelector('#telefono');
  const inputCorreo=document.querySelector('#email');
  const inputEmpresa=document.querySelector('#empresa');

 

  

  document.addEventListener('DOMContentLoaded', ()=>{

    form.addEventListener('submit', actualizarCliente);
    //  COnectar a la base de datos

    conectarDB();

  //verificar id de la url

  const idUrl=new URLSearchParams(window.location.search);
  idCliente= idUrl.get('id')

  if(idCliente){

    setTimeout(()=>{
      obtenerCliente(idCliente);
    },100);
    

  }

})

function actualizarCliente(e){
  e.preventDefault();

  if(inputNombre.value===''|| inputTelefono.value ==='' || inputCorreo.value===''||  inputEmpresa.value===''){

   mostrarAlerta('todos los campos son obligatorios', 'error');
    return;
  }


  //  Actualizar cliente
  const clienteActualizado={
    nombre: inputNombre.value,
    correo: inputCorreo.value,
    telefono: inputTelefono.value,
    empresa: inputEmpresa.value,
    id: Number(idCliente)

  }
  console.log(clienteActualizado);
  const transaction=DB.transaction(['clientes'],'readwrite')
  const objectStore=transaction.objectStore('clientes');

  objectStore.put(clienteActualizado);

  transaction.oncomplete= function(){

    mostrarAlerta('actualizado correctamente');
    form.reset();

    setTimeout(()=>{
      window.location.href='index.html'
    }, 1500);
  }

  transaction.onerror= function(){

    mostrarAlerta('no fue posible actualizar', 'error')
  }





}

function obtenerCliente(id){

  const transaction=DB.transaction(['clientes'], 'readwrite');
  const objectStore=transaction.objectStore('clientes');

  const cliente= objectStore.openCursor();

  cliente.onsuccess=function(e){

    const cursor=e.target.result;

    if(cursor){
      

      if (cursor.value.id===Number(id)){
        llenarForm(cursor.value);

      }
      cursor.continue();
     
    }
  }


  console.log(id);
}

function llenarForm(cliente){
  const{ nombre, correo, telefono, empresa}=cliente;

  inputNombre.value=nombre;
  inputCorreo.value=correo
  inputTelefono.value=telefono;
  inputEmpresa.value=empresa;

  
}






















})();