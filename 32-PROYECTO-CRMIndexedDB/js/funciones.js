

 const form=document.querySelector('#formulario');
 let DB;

function conectarDB(){
  const conectar=window.indexedDB.open('clientes', 1);

  conectar.onerror=()=>{
   console.log('hubo un error');

  }

  conectar.onsuccess=()=>{
    DB= conectar.result;
    
  }

}


function mostrarAlerta(mensaje, tipo){

  const alerta=document.createElement('P');
  const alertaC=document.querySelector('.alerta');

  if(!alertaC) {
    alerta.classList.add('text-center', 'font-bold',  'px-3', 'py-3', 'mt-2', 'rounded-md', 'border', 'max-w-lg', 'mx-auto', 'alerta');

    if(tipo){
      alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700')
  
    }else {
      alerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700')
    }
  
    alerta.textContent= mensaje;
  
  
    form.appendChild(alerta);
  
    setTimeout(()=>{
      alerta.remove();
    }, 3000);
  }}
