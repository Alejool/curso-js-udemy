

const inputMascota=document.querySelector('#mascota');
const inputPropietario=document.querySelector('#propietario');
const inputTelefono=document.querySelector('#telefono');
const inputFecha=document.querySelector('#fecha');
const inputHora=document.querySelector('#hora');
const inputSintomas=document.querySelector('#sintomas');

const form=document.querySelector('#nueva-cita');
const citasContenedor=document.querySelector('#citas');
let editando;


 class Citas{
  constructor (){
    this.citas=[];
  }

  agregarCita(cita){
    this.citas=[...this.citas,cita];
    console.log(this.citas)
  }
  eliminarCita(idCita){
    this.citas=this.citas.filter(cita=> cita.id!==idCita);
    console.log(this.citas);
  }
  editarCita(citaA){
   
   this.citas=this.citas.map(cita=> cita.id===citaA.id ? citaA : cita)

  }
 }

class Interfaz {

  mostrarAlerta(mensaje, tipo){
    const alerta=document.createElement('DIV');
    alerta.classList.add('text-center',  'alert', 'd-block', 'col-12')
    if(tipo==='error'){
      alerta.classList.add('alert-danger');
    }
    else {
      alerta.classList.add('alert-success');
    }
    
    alerta.textContent=mensaje;
    form.insertBefore(alerta, form.firstChild);

    //  QUITAR LA ALERT 
    setTimeout(()=>{
      alerta.remove();
    },3000);
  }


  //  {citas}, crea destructing de citas a las citas 
  mostrarCitas({citas}){
    this.limpiarHtml();

    citas.forEach(cita=>{
      const {mascota, propietario, telefono, fecha, hora, sintomas, id}=cita;

      const divCita=document.createElement('DIV');
      divCita.classList.add('cita', 'p-3', 'text-center');
      divCita.dataset.id=id;

      // scripting 
      // mascota
      const mascotaP=document.createElement('H2');
      mascotaP.classList.add('card-title', 'font-weight-bolder', 'text-uppercase');
      mascotaP.textContent=mascota;

   
      const propietarioP=document.createElement('P');
      propietarioP.innerHTML=` 
      <span class="font-weight-bolder"> Propietario: </span> ${propietario} `;

      const telefonoP=document.createElement('P');
      telefonoP.innerHTML=` 
      <span class="font-weight-bolder"> télefono: </span> ${telefono} `;

      const fechaP=document.createElement('P');
      fechaP.innerHTML=` 
      <span class="font-weight-bolder"> fecha: </span> ${fecha} `;

      const horaP=document.createElement('P');
      horaP.innerHTML=` 
      <span class="font-weight-bolder"> Hora: </span> ${hora} `;


      const sintomasP=document.createElement('P');
      sintomasP.innerHTML=` 
      <span class="font-weight-bolder"> Sintomas: </span> ${sintomas} `;
      
      // le añadimos el boton
      const btnEliminar=document.createElement('BUTTON');
      btnEliminar.classList.add('btn', 'btn-danger','mr-2');
      btnEliminar.innerHTML=' delete <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /> </svg>';

      btnEliminar.onclick=()=>{
        eliminarCita(id);
      }

      const btnEditar=document.createElement('BUTTON');
      btnEditar.classList.add('btn', 'btn-info','mr-2');
      btnEditar.innerHTML='editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /> </svg> ';
      btnEditar.onclick=()=>{
        editarCita(cita);
      }

      divCita.appendChild(mascotaP);
      divCita.appendChild(propietarioP);
      divCita.appendChild(telefonoP);
      divCita.appendChild(fechaP);
      divCita.appendChild(horaP);
      divCita.appendChild(sintomasP);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);
      citasContenedor.appendChild(divCita);


    })

  }
  limpiarHtml(){
    while(citasContenedor.firstChild){
      citasContenedor.firstChild.remove();
    }
  }
 
}


const interfaz=new Interfaz();
const citasAdministradas=new Citas();


eventenListeners();
function eventenListeners(){
  mascota.addEventListener('input', citaDatos);
  propietario.addEventListener('input',citaDatos );
  telefono.addEventListener('input',citaDatos );
  fecha.addEventListener('input',citaDatos );
  hora.addEventListener('input',citaDatos );
  sintomas.addEventListener('input',citaDatos );

  form.addEventListener('submit', citaNueva);

}
//  creamos un objeto para manejar los eventos de todos los campos
const citaObj={
  mascota:'',
  propietario:'',
  telefono:'',
  fecha:'',
  hora:'',
  sintomas:'',
}
// para eso debe existir el name en el html con el nombre igual A LAS PROPIEDADES DEL OBJETO
function citaDatos(e){
   citaObj[e.target.name]=e.target.value;
}

function citaNueva(e){
  e.preventDefault();

  //extraemos la info del objeto
  const {mascota, propietario, telefono, fecha, hora, sintomas}=citaObj;
  if(mascota===''|| propietario==='' || telefono==='' || fecha===''|| hora==='' || sintomas===''){
  interfaz.mostrarAlerta('todos los campos son necesarios', 'error');
  return;
  }


  if(editando){
    interfaz.mostrarAlerta('Editado correctamente');

    // metodo de 
    citasAdministradas.editarCita({...citaObj});

    //cambiar el texto de boton al original
  form.querySelector('button').textContent= 'crear Cita';

  //quitar modo edición
  editando=false;
  }
  else{
    //  generar un id unico PARA identificarlo
    citaObj.id=Date.now();

    // agregar a las citas
    citasAdministradas.agregarCita({...citaObj});

    // mensaje
    interfaz.mostrarAlerta('Agregado correctamente');
  }

 
  form.reset();
  reiniciarObject();
  interfaz.mostrarCitas(citasAdministradas);

}

function reiniciarObject(){
  citaObj.id='';
  citaObj.mascota='';
  citaObj.propietario='';
  citaObj.telefono='';
  citaObj.fecha='';
  citaObj.hora='';
  citaObj.sintomas='';

}

function eliminarCita(idCita){
  citasAdministradas.eliminarCita(idCita);
  interfaz.mostrarAlerta('cita eliminada con exito')
  interfaz.mostrarCitas(citasAdministradas);
}

function editarCita(cita){
  const {mascota, propietario, telefono, fecha, hora, sintomas, id}=cita;

  // llenar los input
  inputMascota.value=mascota;
  inputPropietario.value=propietario;
  inputTelefono.value=telefono;
  inputFecha.value=fecha;
  inputHora.value=hora;
  inputSintomas.value=sintomas;

  citaObj.mascota=mascota;
  citaObj.propietario=propietario;
  citaObj.telefono=telefono;
  citaObj.fecha=fecha;
  citaObj.hora=hora;
  citaObj.sintomas=sintomas;
  citaObj.id=id;

  form.querySelector('button').textContent= 'Actualizar';
  
 editando=true;

}


