(function(){

  let DB;
  




  document.addEventListener('DOMContentLoaded',()=>{

    //concetar a db
    form.addEventListener('submit', validarCliente )

    conectarDB();

  }
  );

  function conectarDB(){
    const conectar=window.indexedDB.open('clientes', 1);

    conectar.onerror=()=>{
     mostrarAlerta('hubo un error', 'error');

    }

    conectar.onsuccess=()=>{
      DB= conectar.result;
      
    }

  }

  function validarCliente(e){
    e.preventDefault();
   
    const nombre=document.querySelector('#nombre').value;
    const correo=document.querySelector('#email').value;
    const telefono=document.querySelector('#telefono').value;
    const empresa=document.querySelector('#empresa').value;

    if(nombre===''|| correo==='' || telefono===''||  empresa===''){

      mostrarAlerta('todos los campos son obligatorios', 'error');
      return;

    }

    // Crear un objetc con la información
    const cliente={
      nombre, 
      correo, 
      telefono,
      empresa, 
    
    }
    cliente.id= Date.now();

    crearCliente(cliente);



    console.log(cliente);


   

    



  }




  function crearCliente(cliente){
    const transaction=DB.transaction(['clientes'], 'readwrite');

    const objectStore=transaction.objectStore('clientes');

    objectStore.add(cliente);

    transaction.onerror=()=>{
      mostrarAlerta('correo ya utilizado', 'error');
    }

    transaction.oncomplete=()=>{
     mostrarAlerta('agregado correctamente al indexedDB');

     setTimeout(()=>{
      //  llevar a otro pagina html
      window.location.href='index.html'
     },1000)
    }

    

  }
  
  



})();