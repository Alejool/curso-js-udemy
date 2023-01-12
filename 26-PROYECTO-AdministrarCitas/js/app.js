

const inputMascota=document.querySelector('#mascota');
const inputPropietario=document.querySelector('#propietario');
const inputTelefono=document.querySelector('#telefono');
const inputFecha=document.querySelector('#fecha');
const inputHora=document.querySelector('#hora');
const inputSintomas=document.querySelector('#sintomas');

const form=document.querySelector('#nueva-cita');
const citasContenedor=document.querySelector('#citas');
let editando;
let Db;

window.onload=()=>{

  eventenListeners();
  crearDB();
}


function eventenListeners(){
  mascota.addEventListener('input', citaDatos);
  propietario.addEventListener('input',citaDatos );
  telefono.addEventListener('input',citaDatos );
  fecha.addEventListener('input',citaDatos );
  hora.addEventListener('input',citaDatos );
  sintomas.addEventListener('input',citaDatos );

  form.addEventListener('submit', citaNueva);

}




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
  mostrarCitas(){
    this.limpiarHtml();

    const objectStore=Db.transaction('citas-Veterinaria').objectStore('citas-Veterinaria');

    const fntextoHeading=this.textoHeading;

    objectStore.openCursor().onsuccess= function(e){
      const cursor=e.target.result;

      const total=objectStore.count();

      total.onsuccess=function(){
        fntextoHeading(total.result);

      }

      if(cursor){
        

      const {mascota, propietario, telefono, fecha, hora, sintomas, id}=cursor.value;

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
      const cita=cursor.value;
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

      //  ir al siguiente elemento
      cursor.continue();
    
      }

    }
  }
  limpiarHtml(){
    while(citasContenedor.firstChild){
      citasContenedor.firstChild.remove();
    }
  }
  textoHeading(resultado){
    console.log(resultado);
    const administra=document.querySelector('#administra')
    if(resultado>0){
      administra.textContent='Administra tus citas YA'
    }else {
      administra.textContent='Inicia por crear una nueva cita'
    }
  }
 
}


const interfaz=new Interfaz();
const citasAdministradas=new Citas();




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
   

    // metodo de 
    citasAdministradas.editarCita({...citaObj});

   

  //   Editar en db

  const transaction= Db.transaction(['citas-Veterinaria'], 'readwrite');
  const objectStore=transaction.objectStore('citas-Veterinaria');
  objectStore.put(citaObj);

  transaction.oncomplete=()=>{

  interfaz.mostrarAlerta('Editado correctamente');
     //cambiar el texto de boton al original
  form.querySelector('button').textContent= 'crear Cita';
  //quitar modo edición
  editando=false;
  }
  transaction.onerror=()=>{
    console.log('error');
  }

  }
  else{
    //  generar un id unico PARA identificarlo
    citaObj.id=Date.now();

    // agregar a las citas
    citasAdministradas.agregarCita({...citaObj});

    //  insertar en el indexdb
    const transaction= Db.transaction(['citas-Veterinaria'], 'readwrite');

    const objectStore=transaction.objectStore('citas-Veterinaria');
    objectStore.add(citaObj);

    transaction.oncomplete=function(){
       // mensaje
    interfaz.mostrarAlerta('Agregado correctamente');
    }

   
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

function eliminarCita(id){

  const transaction=Db.transaction(['citas-Veterinaria'], 'readwrite');
  const objectStore=transaction.objectStore('citas-Veterinaria');
  objectStore.delete(id); 
  

  transaction.oncomplete=()=>{
    interfaz.mostrarAlerta('cita eliminada con exito');
    interfaz.mostrarCitas();
  }

  transaction.onerror=()=>{
    console.log('hubo un error');
  }

  
  
  
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

function crearDB(){
  //crerar la base de datos
  const crear= window.indexedDB.open('citas-Veterinaria', 1);


  //  si hay error
crear.onerror=function(){
  console.log('hubo un error');
}

crear.onsuccess= function(){
  console.log('todo correcto');

  Db=crear.result;
  interfaz.mostrarCitas();

}

//  definir el schema
crear.onupgradeneeded= function(e){
  const db=e.target.result;

  const objectStore=db.createObjectStore('citas-Veterinaria',{
    keyPath: 'id',
    autoIncrement:true
  });

  //  DEFINIR COLUNMAS
    objectStore.createIndex('mascota', 'mascota', {unique:false});
    objectStore.createIndex('propietario', 'propietario', {unique:false});
    objectStore.createIndex('telefono', 'telefono', {unique:false});
    objectStore.createIndex('fecha', 'fecha', {unique:false});
    objectStore.createIndex('hora', 'hora', {unique:false});
    objectStore.createIndex('sintomas', 'sintomas', {unique:false});
    objectStore.createIndex('id', 'id', {unique:true});

    console.log('CREADA Y LISTA ');
}



}


