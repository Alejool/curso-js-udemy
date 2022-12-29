


//  variables
const form=document.querySelector('#agregar-gasto');
const listGastos=document.querySelector('#gastos ul');



//  eventos
evenListener();
function evenListener(){
document.addEventListener('DOMContentLoaded',preguntarPresupuesto)

}

//  clases
class interfaz{
  #gasto;
  #cantidad;

}

class presupesto{
  constructor(presupesto){
    this.presupuesto= Number(presupesto);
  }
}



let presupestoInicial;

//  funciones

function preguntarPresupuesto(){
 const Presupuesto= prompt("Ingresa tu presupuesto");



 if(Presupuesto==='' || Presupuesto===null || isNaN(Presupuesto) || Presupuesto<=0){
  window.location.reload();
 }

  presupestoInicial=new presupesto(Presupuesto);
  console.log(presupestoInicial)
 
 
}