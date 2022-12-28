

// constructores

function Seguro(marca, year, tipo){
  this.marca= marca;
  this.year= year;
  this.tipo= tipo;
}


Seguro.prototype.cotizacion= function(){

  let cantidad;
  const base=2000;

  switch(this.marca){
    case '1': 
    cantidad=base*1.15;
    break;

    case '2':
      cantidad=base*1.05;
    break;

    case '3':
      cantidad=base*1.35;
    break;


    default:
      break;
  }

  // leer año y realizar logica
   const añoModelo=new Date().getFullYear()-this.year;
    cantidad-=((añoModelo*3)*cantidad)/100;
  
    //tipo de seguro
    if(this.tipo==='completo'){
      cantidad*=1.50;
    }else {
      cantidad*=1.30;
    }
    
    return cantidad;

}

const interfaz= new Interfaz(); 


function Interfaz(){}

//prototype

Interfaz.prototype.mostrarSeguro=(seguro, total)=>{
  
  const div=document.createElement('DIV');
  const boton=document.querySelector('button');
  const resultado=document.querySelector('#resultado');
  const spinner=document.querySelector('#cargando');

 const {marca, year, tipo}=seguro;
 let marcaT;
  switch(marca){
    case '1':
      marcaT="Americano";
      break;
    case '2':
      marcaT="Asiático";
      break;
    case '3':
      marcaT="Europeo";
      break;
      
    default:
      break;
  }
   
  
  div.classList.add('m-10');
  div.innerHTML=`

  <p class="header"> Tu seguro </p>
  <p class="font-bold"> Marca: <span class="font-normal">  ${marcaT} </span> </p>
  <p class="font-bold"> Año: <span class="font-normal">  ${year} </span> </p>
  <p class="font-bold "> Seguro: <span class="font-normal">  ${tipo} </span> </p>

   <p class="text-2xl font-bold mt-5"> Total: <span class="font-normal"> $ ${total} </span> </p>
  `;
         
  boton.style.display='none';
  spinner.style.display='block';
   setTimeout(()=>{
    boton.style.display='block';
   spinner.style.display='none';
   resultado.appendChild(div)
  }, 2000)
 

}
Interfaz.prototype.llenarYears= ()=>{
  const max= new Date().getFullYear();
  const min= max-15;

const añadir=document.querySelector('#year')

for(let i=max; i>=min; i--){

  let crear=document.createElement('OPTION')
  crear.classList.add('opcion', 'text-center');
  crear.value=i;
  crear.textContent=i;
  añadir.append(crear);
}
}

Interfaz.prototype.mostrarAlerta=(mensaje, tipo)=>{
 
  const resultados=document.querySelector('#resultado ');
  while(resultados.firstChild){
    resultados.firstChild.remove();
  }
  
  const mensajes = document.createElement("P")
  const resultado=document.querySelector('#resultado');


  if(tipo==='error'){  
    mensajes.classList.add("error");
      
  }
  else {
    mensajes.classList.add("correcto");   
  }
  mensajes.textContent=mensaje;
  resultado.insertBefore(mensajes, resultado.firstChild);

  setTimeout(()=>{
   mensajes.remove();
  }, 2000)
}


eventListener();

function eventListener(){
  const formulario=document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', validacion)
}


document.addEventListener('DOMContentLoaded', ()=>{
 
interfaz.llenarYears();

})


function validacion(e){
 
    e.preventDefault();
    let mensaje;
    //leer los datos
  const marca=document.querySelector('#marca').value;
  const year=document.querySelector('#year').value;
  const tipo=document.querySelector('input[name="tipo"]:checked').value;


  if(marca==='' || tipo==='' || year===''){
    mensaje='Todos los campos son obligatorios';
    interfaz.mostrarAlerta(mensaje, 'error');
    return;
  }
   
    mensaje='procesando...';
    interfaz.mostrarAlerta(mensaje, 'correcto');

  // ocultar resultados



  //instanciar el seguro;
  const seguro=new Seguro(marca, year, tipo);
  console.log(seguro);

  const total=seguro.cotizacion();
  interfaz.mostrarSeguro(seguro, total)
   

 
}