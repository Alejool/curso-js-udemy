document.addEventListener('DOMContentLoaded', ()=>{
  const email={
    email:'', 
    asunto:'',
    mensaje:''
  }
  //seleccionar 
  
 
  const inputAsunto=document.querySelector('#asunto');
  const inputMensaje=document.querySelector('#mensaje');
  const formulario=document.querySelector('#formulario');
 
  const inputCorreo=document.querySelector('#email');
  const botonEnvio=document.querySelector('#formulario  .enviar');
  const botonReset=document.querySelector('#formulario  .reset');
  const spinner=document.querySelector('#spinner');
  nuevoCampo();
  const inputCorreoAlterno=document.querySelector('#emailAltern');

inputCorreo.addEventListener('input', validar)
inputCorreoAlterno.addEventListener('input',validarEmailAl )
inputAsunto.addEventListener('input',validar)
inputMensaje.addEventListener('input', validar)
botonReset.addEventListener('click', reiniciarForm);
// botonEnvio.addEventListener('click',simularEnvio)
formulario.addEventListener('submit',simularEnvio)


function nuevoCampo(){

  const cc=document.createElement('DIV');
  cc.classList.add('emailAltern','flex', 'flex-col', 'space-y-2');
  cc.innerHTML=`
  <label for="emailAltern" class="font-regular font-medium">Email Alterno: <span> (opcional) </span></label>
  <input id="emailAltern" type="email" name="email" placeholder="Email Destino, ej: mkt@empresa.com" class="border border-gray-300 px-3 py-2 rounded-lg"  />`
  formulario.insertBefore(cc, formulario.children[1]);

}

function validarEmailAl(e){
  if(inputCorreoAlterno.value.length>0){
    if(!validarEmail(e.target.value)){
      vacio(`el email no es valido`, e.target.parentElement)
      return;
    } quitarAlerta(e.target.parentElement)
  }
  quitarAlerta(e.target.parentElement)
}


function reiniciarForm(e){
  e.preventDefault();
 restForm();

 

}
function restForm(){
  email.email='';
  email.asunto='';
  email.mensaje='';
  formulario.reset();
  comprobarCorreo();
  quitarAlertas();
  
}
function quitarAlertas() {
  const alertas = document.querySelectorAll('.vacio')
  if (alertas.length > 0) {
      alertas.forEach(e => {
          e.remove();
      })
    }
  }

function simularEnvio(e){
  e.preventDefault();
  spinner.classList.remove('hidden')

  setTimeout(()=>{
    spinner.classList.add('hidden')
    restForm();
    envioExitoso();
   },3000);
   
   
}

function envioExitoso(){
  const enviar=document.createElement('P');
  enviar.textContent=' Envio exitoso';
  enviar.classList.add('enviado');
  formulario.appendChild(enviar);
  setTimeout(()=>{
    enviar.remove();
   },3000)

}
function validar(e){
  
  const datos=e.target.value.trim();
  const campo=e.target.id;
  if(datos===''){
    vacio(`El campo ${campo} es obligatorio`, e.target.parentElement);
    email[e.target.name]='';
    comprobarCorreo();
  return;
}

if(e.target.id==="email" && !validarEmail(e.target.value)){
  vacio(`el email no es valido`, e.target.parentElement)
  email[e.target.name]='';
  comprobarCorreo();
  return;
};
 quitarAlerta(e.target.parentElement);
 //asignar valores al objeto
 email[e.target.name]=e.target.value.trim().toLowerCase();
 
 //comprobar el objeto
 comprobarCorreo();
}



function vacio(mensaje, campo){
  //comprobar si hay alertas anteriores
  quitarAlerta(campo);

  const elemento=document.createElement('P');
  elemento.textContent=mensaje;
  elemento.classList.add('vacio');
  campo.appendChild(elemento)

  }

  //limpia alerta cuando pasa la validación
function quitarAlerta(campo){
  //elimina la alerta
  const alert=campo.querySelector('.vacio');
  if(alert){
    alert.remove()
  }
}

function validarEmail(email){
  //expresion regular: busca un patron para email (@, dominio, etc)
  const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
  const resultado=regex.test(email);
  return resultado;
}


function comprobarCorreo(){
  
  if(Object.values(email).includes('')){
    botonEnvio.classList.add('opacity-50');
    botonEnvio.disabled=true;

    return;
  }
    botonEnvio.classList.remove('opacity-50');
    botonEnvio.disabled=false;
  
}


});