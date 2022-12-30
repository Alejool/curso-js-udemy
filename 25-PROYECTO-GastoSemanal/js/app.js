


//  variables
const form=document.querySelector('#agregar-gasto');
const listGastos=document.querySelector('#gastos ul');
const presupuestoI=document.querySelector('#presupuesto #total');



//  eventos
evenListener();
function evenListener(){
document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
form.addEventListener('submit', validarGasto);

}

//  clases
class Interfaz{
  agregarPresupuesto(total){
    presupuestoI.textContent=total;
    restante.textContent=total;
  }

  mostrarAlerta(mensaje,tipo){
    
    const validacion=document.createElement('DIV');
    validacion.classList.add('text-center',  'alert')
    document.querySelector('.primario ').insertBefore(validacion,form);

  
    if(tipo==="error"){
      validacion.classList.add('alert-danger');
       
    }else if(tipo==='correcto'){
      validacion.classList.add('alert-success');

    }
  validacion.textContent=mensaje;
    
    //quitar mensaje
    setTimeout(()=>{
      validacion.remove();

    },3000)
    
  
  }
  
  listaGastos(gastos){
    this.limpiarLista();
    
    gastos.forEach(gastoss => {
      const {cantidad,gasto, id}=gastoss;

      const gastosL=document.createElement('LI');
      gastosL.className='font-weight-bold list-group-item d-flex justify-content-between align-items-center';

      //  agregarle el id como identificador para eliminarlo previamente, hay 2 formas
      // gastosL.setAttribute('data-id', id);
      gastosL.dataset.id=id;   //  los dos hacen lo mismo // recomendada


      //  html del gasto
      gastosL.innerHTML=`${gasto} <span class="badge badge-primary badge-pill"> $ ${cantidad}</span>`;

      //agregar el boton para borrar el gasto
      const btnBorrar=document.createElement('BUTTON');
      btnBorrar.classList.add('btn', 'btn-sm', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML='Delete &times'
      gastosL.appendChild(btnBorrar)

      listGastos.appendChild(gastosL);

   });
    

  }
  limpiarLista(){
    
    while(listGastos.firstChild){
      listGastos.firstChild.remove();
    }
  }
  actualizarRestante(dRestante){
    restante.textContent=dRestante;
  }
  comprobarPresupuesto(presupestoObj){
    const{ restante, presupuesto}=presupestoObj;
    const restanteP=document.querySelector('#presupuesto .restante');
    //comprobra el 25

    
    if((presupuesto/4)>restante){
      restanteP.classList.remove("alert-sucess", "alert-warning");
      restanteP.classList.add("alert-danger");

     
    }else if((presupuesto/2)>restante){

      restanteP.classList.remove("alert-danger");
      restanteP.classList.add("alert-warning");
    }

    if (restante<=0){
      interfaz.mostrarAlerta('superaste tus tope de presupuesto', 'error');
      form.querySelector('button').disabled=true;

    }
      
  }
  
}


class presupesto{
  constructor(presupesto){
    this.presupuesto= Number(presupesto);
    this.restante=Number(presupesto);
    this.gastos=[];
  }
  nuevoGasto(gasto){
    this.gastos=[gasto,...this.gastos];
    this.actualizarRestante();
  }
  actualizarRestante(){
    const gastado=this.gastos.reduce((total, gasto)=> Number(total+gasto.cantidad) , 0);
    
    this.restante=this.presupuesto-gastado;


  }
}

const interfaz=new Interfaz();
let TotalPresupuesto;

//  funciones

function preguntarPresupuesto(){
 const Presupuesto= prompt("Ingresa tu presupuesto");
 if(Presupuesto==='' || Presupuesto===null || isNaN(Presupuesto) || Presupuesto<=0){
  window.location.reload();
 }

  TotalPresupuesto=new presupesto(Presupuesto);
  interfaz.agregarPresupuesto(Presupuesto);
  console.log(TotalPresupuesto);
}


function validarGasto(e){
  e.preventDefault();
  const gasto=document.querySelector('#gasto').value;
  const cantidad=Number(document.querySelector('#cantidad').value);
 

  if(gasto==="" || cantidad===""){
    interfaz.mostrarAlerta('todos los campos son obligatorios', 'error');
    return;
  }
  else if(cantidad<=0 || isNaN(cantidad) ){
  interfaz.mostrarAlerta('cantidad no válida', 'error');
  return;
  
  }else{
    interfaz.mostrarAlerta('agregado corrrectamente', 'correcto');
  }

  const gastoss={id:Date.now(), gasto,cantidad};
  TotalPresupuesto.nuevoGasto(gastoss);

  //  lista gastos
  const{ restante, gastos}= TotalPresupuesto;  // extraemos this.gastos de presupesto
  interfaz.listaGastos(gastos)

  //  reiniciar formulario, todod bien
  form.reset();

  //actualizar restante
  interfaz.actualizarRestante(restante);

  // colores restante
  interfaz.comprobarPresupuesto(TotalPresupuesto);

}