

// constructores

function seguro(marca, year, tipo){
  this.marca= marca;
  this.year= year;
  this.tipo= tipo;
}

function Interfaz(){}

//prototype

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
const interfaz= new Interfaz();




const formulario=document.querySelector('#cotizar-seguro');


formulario.addEventListener('submit', interfaz.validacion())
document.addEventListener('DOMContentLoaded', ()=>{
 
interfaz.llenarYears();

})

Interfaz.prototype.validacion= function(){
     
}